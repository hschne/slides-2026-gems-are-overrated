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
- We're gonna keep dunking on poor pagy. I'm sorry, it's great, and I love what Domizio Demichelis who does with it
- It's a really well maintained gem, but it's also a great example
- Because the gap between what the gem does and what I need it to do is ginourmous.
- Who actually here uses pagy? It's like the swiss army knif of pagination. Vie helpers, countless pagination, cursor based pagination, plugins, the list goes on.
- YAGNI and right now, I need just some pagination.
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
- Here's the logic for pagination
- This snippet is ripped from Pagy and simplified by removing all the configurability and different use cases.
- We count results/ divide bu number of results
- Calculate the total number of pages and then do some good-ol offset based pagination.
- Then we pass it to the view
-->

---

# Copy-Paste Pagy Page Two

```ruby [app/concerns/pagy.rb] {*}{lines:true,startLine:21}
  module Helper
    def series_nav(pagy)
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
- And here's the view helper.
- Same story, same core logic, just distilled and reduced.
- Look, my point is not pagination is so simple. It can be much more complicated than this.
- The point is that the useful part of the gem, for one app, may be dramatically smaller than the gem itself.
- It's so small that it can fit in a single file. A single file that I can move between projects as I need.
- A one-file, copy paste dependency if you will.
- Its 50 lines of code. How many do you think pagy has?
-->

---
class: comparison
---

# Pagy vs Copy-Paste

<table>
  <tbody>
    <tr>
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
- It has way more.
- Pagy comes in at a cozy 2835 lines of code. Okay, I havent' sanitized that for comments, but like
- what the frick, right?
- It itself has 3 transitive dependencies
- It has frequent releases, which is great, except if they change the API completely.
- We don't have dependencies
- We don't have any of that. We solve a problem, and we move on.
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
- It's actually one of my favorite gems. It's so simple and elegent. 
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
- The nice part about Pundit is that's at it's core it's just plain Ruby. 
- So we got a base ApplicationPolicy 
- That is the core idea. The rest of the gem is infrastructure around it.
-->

---

# Copy-Paste Pundit

```ruby [app/concerns/pundit.rb] {*}{lines:true,startLine:20}
  class NotAuthorizedError < StandardError; end

  module Controller
    protectedUser

    def authorize(record, query = :"#{action_name}?")
      policy = "#{record.class}Policy".constantize.new(Current.user, record)
      raise NotAuthorizedError unless policy.public_send(query)

      record
    end
  end
end
```

<!--
- What infrastrcutre? This. A glorified constantize to get the right policy class. 
- The whole gem in one method.
-->

---

# Pundit vs Copy-Paste

<table>
  <tbody>
    <tr>
      <td>Lines of code</td>
      <td style="text-align:right">1124</td>
      <td style="text-align:right">32</td>
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
-  And some ceremony. Fun fact, this is a bugfix that is NOT upstream that I added because, well the gem isn't that maintained anymore
- Check this out
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
      <td style="text-align:right">?</td>
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
- Guess what, your 55 line version you can update within seconds. No monkey patching required.
- A couple of issues, yada yada.
-->

---
layout: center
class: text-center
---

# Learn from the best

# Own the code

# Avoid dependency tax

<!--
- Look, I want to re-iterate, what's the point here.
- It's not gems are bloated. Gems have a good reason to be the way that the are, because they want to appeal to everyone
- It's that you can create a pure, focused version of the gem, that you own
- And in doing so, you might learn a thing or two. You're not creating anyting from scratch
- You're learning from the best
- And in doing a focused, copy-pasta-able version of a gem, you get something that's effficient
- Efficient why, because like we saw, it's tiny, you can easily reason about it. 
- And you sidestep all the issues that you have with dependencies, even little ones
-->
