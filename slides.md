---
theme: ./concrete-syntax
layout: cover
title: Gems are Overrated
info: |
  // concrete syntax demo
class: concrete-syntax
drawings:
  persist: false
transition: fade
mdc: true
duration: 35min
---

# Gems Are Overrated

---

# Gems Are Great!

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
- Let's start with something we're all familiar with.
- We need some small piece of functionality - some new feature, some new utility -in our Rails app. 
- Let's say I need pagination. So naturally, we use a gem.
- It's so easy, it just works.
- And the best part is I added like three lines of code.
- But of course, that's not all I did. 
- I added a dependency, a maintenance story, a set of upstream decisions, a bunch of flexibility I probably don't need, and a future relationship with somebody else's code. 
- I took on risk. And these days, third party dependencies are risky.
- Sometimes that's a great trade. But increasingly, I don't think it's the best one, and I wanna talk about why.
-->

---
layout: image-left
image: /avatar.webp
---

# Hans Schnedlitz

Freelance Ruby Engineer 💎

- Vienna.rb & RubyConf Austria 
- [hansschnedlitz.com](https://hansschnedlitz.com) 🌐
- [@hansschnedlitz](https://bsky.app/profile/hansschnedlitz.bsky.social)

<!--
My name is Hans, I'm a Ruby freelancer from Vienna. I organize Vienna.rb and co-organize RubyConf Austria.
-->

---

# Gems Are Efficient

1. I have problem.
2. Build or add gem?
3. Gem is cheap & easy
4. I add gem
<!--
- Let's track back. Why do we use gems?
- For a long time, this was just straightforward economics.
- I have a problem. I can build it myself, or I can add a gem. Building it myself is expensive. Adding a gem is cheap. So I add the gem.
- Take pagination. You're building a Rails app, you need pagination, you reach for Pagy, Kaminari, whatever. A few lines later, the problem is solved.
- And to be fair, for many years that was correct. The upfront cost of using a gem was tiny compared to the cost of learning the problem, implementing it well, and maintaining it yourself.
-->

---

# The part we usually don't count

<PhotoPile :images="[
  './img/dependabots.png',
  './img/supplychain.png',
  './img/releases.png',
  './img/readme.png',
  './img/care.png',
  './img/drama.png',
]" />
<!--
The issue is not that gems are bad. The issue is that we tend to stop the calculation too early.

A gem is not just setup cost, it's a long-term relationship.

- Gems come with: 
- Updates
- API changes
- Deprecations
- Security advisories
- Transitive dependencies
- Unexpected breakage
- Abstractions that don't quite fit
- Upstream decisions
-->

---
layout: fact
---

# YAGNI

<!--
- Most importantly, using a gem means accepting the decisions made by maintainers who are solving a broader problem than the one I actually have. 
- A gem has to be useful to lots of people, in lots of apps, with lots of edge cases. My app usually does not. My app just needs one specific thing to work, in one specific context, with one set of constraints.
- I don't need pagination as a reusable abstraction for the Ruby ecosystem. I need next page and previous page in this app. And if you look at it that way, the cost model changes.
-->

---


<!--
- The obvious response here is: fine, if the gem is too much, build it yourself. Or you know fork it.
- Most of the time, I do not actually want to reinvent the problem from first principles. 
- And neither do I want to inherit all the abstraction and ceremony that comes with maintainging a fork. 
- When I pull in a gem , I want the gem author's understanding of the problem - just without all the extra machinery that comes with packaging it up for the whole ecosystem.
-->

---

# Copy-Paste

- Read the gem
- Understand the useful part
- Strip away the rest
- Keep the smaller version locally

<!--
- That is the interesting middle ground.
- Read the gem. Understand the part that solves the problem. Strip away the rest. Keep the smaller version locally.
- Not install the gem.
- Not reinvent it from scratch.
- Distill the gem into something so small and useful I can copy-paste it to another application and it just works.
-->

---

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
  # ...

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
layout: center
---


| Gem  | Lines of code | Releases | Issues / month |
|---|---:|---:|---:|
| Pagy | 2,835 | 85 | ~9 |
| Copy-Pasta Pagy | 53 | 1 | 0 |


<!--
- These are real numbers.
- pagy is a great gem. It has 85 releases because it solves a broad problem well.
- But if all I need is next and previous, I don't inherit any of that surface area.
- 53 lines. One release. No upstream issues to track.
- That is what distillation looks like in practice.
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
```
method=GET path=/products format=html controller=ProductsController action=index status=200
```

<!--
- Another example. Rails request logs are noisy by default — you get half a dozen lines per request, most of it noise.
- Lograge collapses that into a single structured line.
- Again: three lines, problem solved. But same story as before.
-->

---

# Copy-Paste Lograge

```ruby {*}{lines:true} [config/initializers/lograge.rb]
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

```ruby {lines:true,startLine:12} [config/initializers/lograge.rb]
  # ...

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
layout: center
---


| Gem | Lines of code | Releases | Issues / month |
|---|---:|---:|---:|
| Lograge | 863 | 39 | ~2 |
| Copy-Pasta Lograge | 55 | 1 | 0 |


---

# The tradeoff more clearly


| Approach | Upfront cost | Long-term cost | Control | Fit |
|---|---:|---:|---:|---:|
| Add gem | Low | Medium/High | Low | General |
| Build from scratch | High | Low | High | Exact |
| Distill from gem | Medium | Low | High | Exact |

<!--
Once you look at it this way, there are really three options.

I can use the gem as-is. That wins on upfront convenience, but I inherit the full maintenance story, the extra surface area, and all the upstream priorities.

I can build the thing from scratch. That gives me total control, but it is the most expensive option upfront and I lose the benefit of the gem author's experience.

Or I can do the interesting thing: keep the expertise, throw away the excess, and own the smaller version locally.

That is the tradeoff in one sentence. When I add a gem, what I often really want is not the whole packaged abstraction. I want the maintainer's understanding of the problem.

That is why this is not really an argument about purity. It is an argument about economics.

In a lot of cases, the sweet spot is not dependency or reinvention. It is distillation.
-->

---

# Why Now?

<!--
- None of this is entirely new.
- Vendoring is old. Forking is old. Copy-pasting code is as old as software.
- What changed is not the idea. What changed is the cost of understanding and adaptation.
- It has become much cheaper to look at a library, understand its architecture, identify the parts that matter, and reshape them into something project-specific.
- AI is part of that shift. Not because it removes the need for judgment, but because it removes a lot of the drudgery. It can help inspect the code, explain the internals, identify the core pieces, and produce a reduced version that I can then verify and own.
- The judgment still matters. I still have to decide whether a gem is a good candidate for this treatment, whether I understand the result, and whether the reduced version is actually safe to own. But the upfront cost of adaptation has dropped a lot, while the cost of dependency ownership has stayed more or less the same.
- That moves the tradeoff.
-->

---

> Read the [gem-name] gem: https://github.com/Rails-Designer/rails_icons. Copy the approach the gem takes to [do something] and boil that functionality down to a single file.

# Why not just fork or vendor?

- Forking keeps the architecture
- Vendoring keeps a lot of code
- Distilling keeps the essence

<!--
Forking and vendoring are related ideas, but they are not quite what I mean.

If I fork a gem, I gain control, but I still keep the whole architecture, all the assumptions, and most of the maintenance burden. I am still living inside somebody else's design.

If I vendor a gem, I bring the source into my repo and edit it locally. That helps, but I still end up carrying around a lot of code I probably don't need.

Distilling is different. The point is not to preserve the library and merely relocate it. The point is to extract the essence of what solves my problem and leave the rest behind.

That is also why the tradeoff is different from building from scratch. I am not refusing to learn from the gem. Quite the opposite. I am explicitly trying to benefit from the author's expertise while declining to take on the full packaged abstraction.

That is why distilling can land in a better place than either forking, vendoring, or starting from zero.
-->

---

# Good candidates and bad candidates

- Good: utilities, UI behavior, helpers, wrappers, pagination
- Bad: auth, crypto, deeply stateful systems, protocol-heavy libs
- Heuristic: can I fully read and understand it in one sitting?

<!--
This approach is obviously not for everything.

It works best when the dependency can be reduced to something small, local, and understandable. Utility gems are good candidates. UI behavior is often a good candidate. Small helpers, formatters, adapters, wrappers, icon helpers, pagination - these are all plausible.

There are also very obvious cases where I would not do this. Authentication. Cryptography. Deeply stateful systems. Protocol-heavy libraries. Anything where the whole point of using a well-established dependency is that many eyes have already looked for bugs and edge cases.

My rule of thumb is simple.

If I can boil it down to a few files I can fully read and understand in one sitting, it is a candidate.
If I would need a week to understand it, I should probably keep the dependency.
-->

---

# The ecosystem objection

- Does this weaken the ecosystem?
- What belongs upstream?
- Distillation is often subtraction

<!--
There is an obvious critique here, which is that this sounds a bit parasitic.

If everybody starts treating gems as source material and nobody contributes back, the ecosystem gets weaker. The whole approach depends on strong libraries existing in the first place.

I think that concern is real.

At the same time, in many of these cases, what I am doing locally is not something that belongs upstream. I am removing features, narrowing scope, deleting abstractions, and adapting things to one application's needs. That is useful to me, but not necessarily useful to the gem.

If I find a real bug, discover a missing edge case, or make a genuinely reusable improvement, I should absolutely contribute that back. But the default operation here is usually subtraction rather than addition.

So I don't think this replaces open source contribution. I think it changes what role open source plays in the workflow.
-->

---

# Bigger picture

- Gems as dependencies
- Gems as blueprints
- Gems as reference implementations

<!--
That may be the larger shift here.

Maybe libraries become less valuable as things I install unchanged and more valuable as reference implementations, blueprints, and collections of hard-won ideas I can adapt to my own app.

That is not the end of gems. And it is not the end of open source. If anything, it depends on the ecosystem continuing to produce excellent libraries.

But it might be a shift in how I use them.

Less as permanent runtime dependencies.
More as source material I can study, reshape, and own.
-->

---

# Ending

- Not "gems are bad"
- Not "rewrite everything"
- Better middle ground
- Own the smaller version of the idea

<!--
So the point is not that gems are bad.
And it is not that everything should be rewritten in-house.

The point is that the best alternative to a gem is often not building from scratch. It is owning a smaller version of the gem's core idea.

Gems are still valuable. I just increasingly think of them less as permanent tenants in my app and more as excellent blueprints.

That middle ground - between dependency and reinvention - is the part I find most interesting.
-->
