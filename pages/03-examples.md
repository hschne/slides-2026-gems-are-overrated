# One-Page Pagy

```ruby [app/concerns/pagy.rb] {*}{lines:true}
module Pagy
  module Controller
    protected

    def pagy(scope, limit: 20)
      page        = [params[:page].to_i, 1].max
      count       = scope.count
      total_pages = [(count.to_f / limit).ceil, 1].max
      page        = [page, total_pages].min

      meta = {
        page:        page,
        total_pages: total_pages,
        prev_page:   page > 1,
        next_page:   page < total_pages
      }

      [meta, scope.offset((page - 1) * limit).limit(limit)]
    end
  end

  # ...
```

<!--
- Pagination is a good example because the gap between what the gem does and what I may actually need is often huge.
- A gem has to support many use cases, configuration options, adapters, styles, conventions, and edge cases. My app may just need a tiny subset of that.
- So the question is not "am I smart enough to write pagination?" The question is: how much of pagination do I actually need to own in this app?
- Very often, the answer is: not much.
- A reduced version might fit into a single helper or concern.
- The point of this example is not that pagination is easy. The point is that the useful part of the gem, for one app, may be dramatically smaller than the gem itself.
- That is the gap I'm interested in.
- I don't necessarily want to invent the solution from scratch. I want to borrow the right ideas and throw away the rest.
-->

---

```ruby [app/concerns/pagy.rb] {*}{lines:true,startLine:23}
  module Helper
    def pagy_nav(pagy)
      return unless pagy[:total_pages] > 1

      html = ""
      html << link_to("Previous", url_for(page: pagy[:page] - 1)) if pagy[:prev_page]
      html << content_tag(:span, "Page #{pagy[:page]} of #{pagy[:total_pages]}")
      html << link_to("Next", url_for(page: pagy[:page] + 1)) if pagy[:next_page]
      html.html_safe
    end
  end
end
```

---
layout: fact
---


|   | Lines of code | Releases | Issues / month |
|---|---:|---:|---:|
| Pagy | 2835 | 85 | ~9 |
| Copy-Pasta Pagy | 53 | 1 | 0 |


<!--
- These are real numbers.
- pagy is a great gem. It has 85 releases because it solves a broad problem well.
- But if all I need is next and previous, I don't inherit any of that surface area.
- 53 lines. One release. No upstream issues to track.
- That is what distillation looks like in practice.
-->

---

# Pundit

```ruby [Gemfile]
gem "pundit"
```

```ruby [app/controllers/application_controller.rb]
include Pundit::Authorization
```

```ruby [app/policies/post_policy.rb]
class PostPolicy < ApplicationPolicy
  def update?
    user == record.author
  end
end
```

```ruby [app/controllers/posts_controller.rb]
def update
  authorize @post
end
```

<!--
- Authorization is another classic gem grab. I need to control who can do what, so I reach for Pundit.
- The convention is elegant: one policy class per model, one method per action.
- But again, the gem has to support namespaces, scopes, strong parameters, caching, view helpers, test helpers...
-->

---

# One-File Pundit

```ruby [app/concerns/pundit.rb] {*}{lines:true}
module Pundit
  class ApplicationPolicy
    attr_reader :user, :record

    def initialize(user, record)
      @user   = user
      @record = record
    end

    def index?   = false
    def show?    = false
    def new?     = false
    def create?  = false
    def edit?    = false
    def update?  = false
    def destroy? = false
  end

  # ...
```

<!--
- The base class is the interesting part. Everything denied by default — you opt in per action.
- That is the core idea. The rest of the gem is infrastructure around it.
-->

---

```ruby [app/concerns/pundit.rb] {*}{lines:true,startLine:20}
  class NotAuthorizedError < StandardError; end

  module Controller
    protected

    def authorize(record, query = :"#{action_name}?")
      policy = "#{record.class}Policy".constantize.new(current_user, record)
      raise NotAuthorizedError unless policy.public_send(query)

      record
    end
  end
end
```

<!--
- The authorize method is a single convention: take the record's class name, find the matching policy, call the right method.
- PostPolicy, show?, done.
- The whole gem in one method.
-->

---
layout: fact
---


|  | Lines of code | Releases | Issues / month |
|---|---:|---:|---:|
| Pundit | 1124 | 47 | ~3 |
| Copy-Pasta Pundit | 30 | 1 | 0 |


---

# Lograge

```ruby [Gemfile]
gem "lograge"
```

```ruby [config/initializers/lograge.rb]
Rails.application.configure do
  config.lograge.enabled = true
end
```

```sh
method=GET path=/products format=html controller=ProductsController action=index status=200
```

<!--
- Another example. Rails request logs are noisy by default — you get half a dozen lines per request, most of it noise.
- Lograge collapses that into a single structured line.
- Again: three lines, problem solved. But same story as before.
-->

---

# Copy-Paste Lograge

```ruby [config/initializers/lograge.rb] {*}{lines:true}
class Lograge
  module RackLogger
    private def logger = Object.new.tap { |o| o.define_singleton_method(:info) {} }
  end

  class Subscriber < ActiveSupport::LogSubscriber
    def process_action(event)
      payload = event.payload
      status  = payload[:status] ||
                ActionDispatch::ExceptionWrapper.status_code_for_exception(payload[:exception].first)

      ActionController::Base.logger.info do
        { method: payload[:method], path: payload[:path]&.split("?")&.first,
          format: payload[:format], controller: payload[:controller],
          action: payload[:action], status: }.compact.map { |k, v| "#{k}=#{v}" }.join(" ")
      end
    end
  end

  #...
```

<!--
- Here's the distilled version.
- The Subscriber class is the core — one method, one hash, one line of output.
- The setup machinery has to stay — that's what actually replaces Rails' default log subscribers.
- But the feature code is tiny.
-->

---

```ruby [config/initializers/lograge.rb] {*}{lines:true,startLine:20}
  class << self
    def setup
      Rails::Rack::Logger.prepend(RackLogger)
      require "action_view/log_subscriber"
      require "action_controller/log_subscriber"
      ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
        case subscriber
        when ActionView::LogSubscriber        then unsubscribe(:action_view, subscriber)
        when ActionController::LogSubscriber  then unsubscribe(:action_controller, subscriber)
        end
      end
      Subscriber.attach_to :action_controller
    end

    def unsubscribe(component, subscriber)
      events = subscriber.public_methods(false).reject { |m| m.to_s == "call" }
      events.each do |event|
        ActiveSupport::Notifications.notifier.all_listeners_for("#{event}.#{component}").each do |listener|
          ActiveSupport::Notifications.unsubscribe(listener) if listener.instance_variable_get(:@delegate).class.name.start_with?("#{component.to_s.classify}::")
        end
      end
    end
  end
end

Lograge.setup
```

---
layout: fact
---


|  | Lines of code | Releases | Issues / month |
|---|---:|---:|---:|
| Lograge | 863 | 39 | ~2 |
| Copy-Pasta Lograge | 55 | 1 | 0 |
