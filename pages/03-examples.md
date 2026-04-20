# Pagy

```ruby [Gemfile]
gem "pagy"
```

```ruby [app/controllers/products_controller.rb]
def index
  @pagy, @products = pagy(:offset, Product.all)
end
```

```erb [app/views/products/index.html.erb]
<%== @pagy.series_nav %>
```

<!--
-
- Let's keep bashing poor pagy. I'm sorry, it's great, shoutout to Domizio Demichelis who does a great job maintaining it. 
- But it's also such a good example because the gap between what the gem does and what I may actually need is like ginourmous.
- Who here uses pagy? It's like the swiss army knif of pagination. Vie helpers, countless pagination, cursor based pagination, plugins, the list goes on.
- YAGNI and right now, I need just some basic pagination.
-->

---

# Copy-Paste Pagy

```ruby [app/concerns/pagy.rb] {*}{lines:true}
module Pagy
  module Controller
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
- Here's some basic pagination
- Thats what, 20 lines for a controller method
- The interface is identical
-->

---

# Copy-Paste Pagy Page Two

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

<!--
-
- Here's another 10 or so for a basic view helper.
- Look, my point is not pagination is so simple. It can be much more complicated than this.
- The point is that the useful part of the gem, for one app, may be dramatically smaller than the gem itself.
- That is the gap I'm interested in.
- Because that's the gap where all the bad stuff and the downsides of gems come in.
-->

---
class: comparison
---

# Pundit vs Copy-<span style="display:inline-grid"><span v-click.hide="1" style="grid-area:1/1">Page</span><span v-click="1" style="grid-area:1/1">Paste</span></span>

<table>
  <tbody>
    <tr v-click>
      <td>Lines of code</td>
      <td style="text-align:right">2835</td>
      <td style="text-align:right">53</td>
    </tr>
    <tr v-click>
      <td>Releases</td>
      <td style="text-align:right">83</td>
      <td style="text-align:right">Nope</td>
    </tr>
    <tr v-click>
      <td>Dependencies</td>
      <td style="text-align:right">3</td>
      <td style="text-align:right">You</td>
    </tr>
    <tr v-click>
      <td>Pain</td>
      <td style="text-align:right">Maybe?</td>
      <td style="text-align:right">No</td>
    </tr>
  </tbody>
</table>

<!--
- How big is the gap.
- Pagy comes in at a cozy 2835 lines of code. Okay, I havent' sanitized that for comments, but like
- what the frick, right?
- It itself has 3 transitive dependencies
- It has frequent releases, which is great, except if they change the API completely.
- We don't have dependencies
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
- Let's take a look at another favorite. Who here's likes Pundit?
- It's actually one of my favorite gems. It's so simple and elegent. You know how many lines of code the gem has?
- Let's look at what you need to implement the core use case from scratch.
-->

---

# Copy-Paste Pundit

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
- The nice part about Pundit is that's it's mostly just OOP. 
- So we got a base ApplicationPolicy 
- That is the core idea. The rest of the gem is infrastructure around it.
-->

---

# Copy-Paste Pundit

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
- What infrastrcutre? This. A glorified constantize to get the right policy class. 
- The whole gem in one method.
- Who's your maintainer and what does he do?
-->

---

# Pundit vs Copy-Paste

<table>
  <tbody>
    <tr>
      <td>Lines of code</td>
      <td style="text-align:right">1124</td>
      <td style="text-align:right">30</td>
    </tr>
    <tr v-click>
      <td>Open issues</td>
      <td style="text-align:right">15</td>
      <td style="text-align:right">Nope</td>
    </tr>
    <tr v-click>
      <td>Stars</td>
      <td style="text-align:right">8300</td>
      <td style="text-align:right">You</td>
    </tr>
  </tbody>
</table>

<!--
- The authorize method is a single convention: take the record's class name, find the matching policy, call the right method.
- Stars vs You're the Star.
- The whole gem in one method.
- Who's your maintainer and what does he do?
-->

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
- Lograge collapses that into a single structured line. I like Lograge..
- Again: three lines, problem solved. But same story as before
- How do we get literally just that? Now, this is actually complicated
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
- Just kidding
-  It's a log subscribe that subscribes to ActionController a
-->

---

# Copy-Paste Lograge

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

    # ...

```

<!--
-  That we attach to action_controller and remove the default subscribers
-->

---

# Copy-Paste Lograge

```ruby [config/initializers/lograge.rb] {*}{lines:true,startLine:34}
    def unsubscribe(component, subscriber)
      events = subscriber.public_methods(false).reject { |m| m.to_s == "call" }
      events.each do |event|
        ActiveSupport::Notifications.notifier.all_listeners_for("#{event}.#{component}").each do |listener|
          ActiveSupport::Notifications.unsubscribe(listener) if is_listener?(listener, component)
        end
      end
    end

    def is_listener?(listener, component)
      # Workaround for ActionView::LogSubscriber changes after Rails 7.1
      # See https://github.com/roidrage/lograge/issues/385
      listener.instance_variable_get(:@delegate).class.name.start_with?("#{component.to_s.classify}::")
    end
  end
end

Lograge.setup
```

<!--
-  And some ceremony. Fun fact, this is a bugfix that is NOT upstream that I added because...
-->

---

# Lograge vs Copy-Paste

<table>
  <tbody>
    <tr >
      <td>Last commit</td>
      <td style="text-align:right">Nov 2024</td>
      <td style="text-align:right">today</td>
    </tr>
    <tr v-click>
      <td>Lines of code</td>
      <td style="text-align:right">863</td>
      <td style="text-align:right">55</td>
    </tr>
    <tr v-click>
      <td>Issues</td>
      <td style="text-align:right">68</td>
      <td style="text-align:right">Me</td>
    </tr>
    <tr v-click>
      <td>Dependencies</td>
      <td style="text-align:right">4</td>
      <td style="text-align:right">0</td>
    </tr>
  </tbody>
</table>

<!--
- Lograge hasn't been updated since 2024. And that matters, because it don't work so good with new Rails versions sometimes
- Anyway, as usual, gives you lots of configurability that you don't need, so 800 LoC
- Vs our 55.
-->
