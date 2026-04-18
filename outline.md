# Story outline

## Intro

Let's start with a very ordinary Rails decision. I need some small piece of functionality - some new feature, some new utility, so naturally I add a gem.

It's so easy. I added like three lines of code, and my feature works. But of course, that's not all I did. I added a dependency, a maintenance story, a set of upstream decisions, a bunch of flexibility I probably don't need, and a future relationship with somebody else's code.

Sometimes that's a great trade. But increasingly, I don't think it's the best one.

My name is Hans, I'm a Ruby freelancer from Vienna. I organize Vienna.rb and co-organize RubyConf Austria.

## The old math

For a long time, this was just straightforward economics.

I have a problem. I can build it myself, or I can add a gem. Building it myself is expensive. Adding a gem is cheap. So I add the gem.

Take pagination. You're building a Rails app, you need pagination, you reach for Pagy, Kaminari, whatever. A few lines later, the problem is solved.

```ruby
gem "pagy"
```

```ruby
# app/controllers/products_controller.rb
def index
  @pagy, @products = pagy(:offset, Product.all)
end
```

```erb
<%== @pagy.series_nav %>
```

Done. Three lines of code. It feels absurd to even question this. Of course the gem wins.

And to be fair, for many years that was correct. The upfront cost of using a gem was tiny compared to the cost of learning the problem, implementing it well, and maintaining it yourself.

## The part we usually don't count

The issue is not that gems are bad. The issue is that we tend to stop the calculation too early.

A gem is not just setup cost, it's a long-term relationship.

Gems come come with updates, API changes, deprecations, security advisories, transitive dependencies, unexpected breakage, abstractions that don't quite fit. Most importantly, using a gem means accepting the decisions made by maintainers who are solving a broader problem than the one I actually have. 

A gem has to be useful to lots of people, in lots of apps, with lots of edge cases. My app usually does not. My app just needs one specific thing to work, in one specific context, with one set of constraints.

I don't need pagination as a reusable abstraction for the Ruby ecosystem. I need next page and previous page in this app. And if you look at it that way, the cost model changes.

## Distill the gem

The obvious response here is: fine, if the gem is too much, build it yourself.

But that is still the wrong framing.

Most of the time, I do not actually want to reinvent the problem from first principles. When I pull in a gem , I want the gem author's understanding of the problem - just without all the extra machinery that comes with packaging it up for the whole ecosystem.

That is the interesting middle ground.

Read the gem. Understand the part that solves the problem. Strip away the rest. Keep the smaller version locally.

Not install the gem.
Not reinvent it from scratch.
Distill the gem into something so small and useful I can copy-paste it to another application and it just works.

## Pagination, revisited

Pagination is a good example because the gap between what the gem does and what I may actually need is often huge.

A gem has to support many use cases, configuration options, adapters, styles, conventions, and edge cases. My app may just need a tiny subset of that.

So the question is not "am I smart enough to write pagination?" The question is: how much of pagination do I actually need to own in this app?

Very often, the answer is: not much.

A reduced version might fit into a single helper or concern.

```ruby
# app/controllers/products_controller.rb
def index
  @pagination, @products = paginate(Product.all)
end

private

def paginate(scope, per_page: 20)
  page = [params[:page].to_i, 1].max
  total_count = scope.count
  total_pages = [(total_count.to_f / per_page).ceil, 1].max
  page = [page, total_pages].min

  items = scope.limit(per_page).offset((page - 1) * per_page)

  [{
    page: page,
    total_pages: total_pages,
    total_count: total_count,
    has_next_page: page < total_pages,
    has_prev_page: page > 1
  }, items]
end
```

```erb
<% if @pagination[:total_pages] > 1 %>
  <div>
    <% if @pagination[:has_prev_page] %>
      <%= link_to "Previous", products_path(page: @pagination[:page] - 1) %>
    <% end %>

    <span>
      Page <%= @pagination[:page] %> of <%= @pagination[:total_pages] %>
    </span>

    <% if @pagination[:has_next_page] %>
      <%= link_to "Next", products_path(page: @pagination[:page] + 1) %>
    <% end %>
  </div>
<% end %>
```

The point of this example is not that pagination is easy. The point is that the useful part of the gem, for one app, may be dramatically smaller than the gem itself.

That is the gap I'm interested in.

I don't necessarily want to invent the solution from scratch. I want to borrow the right ideas and throw away the rest.

## The tradeoff more clearly

Once you look at it this way, there are really three options.

I can use the gem as-is. That wins on upfront convenience, but I inherit the full maintenance story, the extra surface area, and all the upstream priorities.

I can build the thing from scratch. That gives me total control, but it is the most expensive option upfront and I lose the benefit of the gem author's experience.

Or I can do the interesting thing: keep the expertise, throw away the excess, and own the smaller version locally.

That is the tradeoff in one sentence. When I add a gem, what I often really want is not the whole packaged abstraction. I want the maintainer's understanding of the problem.

That is why this is not really an argument about purity. It is an argument about economics.

In a lot of cases, the sweet spot is not dependency or reinvention. It is distillation.


| Approach | Upfront cost | Long-term cost | Control | Fit |
|---|---:|---:|---:|---:|
| Add gem | Low | Medium/High | Low | General |
| Build from scratch | High | Low | High | Exact |
| Distill from gem | Medium | Low | High | Exact |


## Why this matters more now

None of this is entirely new.

Vendoring is old. Forking is old. Copy-pasting code is as old as software.

What changed is not the idea. What changed is the cost of understanding and adaptation.

It has become much cheaper to look at a library, understand its architecture, identify the parts that matter, and reshape them into something project-specific.

AI is part of that shift. Not because it removes the need for judgment, but because it removes a lot of the drudgery. It can help inspect the code, explain the internals, identify the core pieces, and produce a reduced version that I can then verify and own.

The judgment still matters. I still have to decide whether a gem is a good candidate for this treatment, whether I understand the result, and whether the reduced version is actually safe to own. But the upfront cost of adaptation has dropped a lot, while the cost of dependency ownership has stayed more or less the same.

That moves the tradeoff.

## Why not just fork or vendor?

Forking and vendoring are related ideas, but they are not quite what I mean.

If I fork a gem, I gain control, but I still keep the whole architecture, all the assumptions, and most of the maintenance burden. I am still living inside somebody else's design.

If I vendor a gem, I bring the source into my repo and edit it locally. That helps, but I still end up carrying around a lot of code I probably don't need.

Distilling is different. The point is not to preserve the library and merely relocate it. The point is to extract the essence of what solves my problem and leave the rest behind.

That is also why the tradeoff is different from building from scratch. I am not refusing to learn from the gem. Quite the opposite. I am explicitly trying to benefit from the author's expertise while declining to take on the full packaged abstraction.

That is why distilling can land in a better place than either forking, vendoring, or starting from zero.

## Good candidates and bad candidates

This approach is obviously not for everything.

It works best when the dependency can be reduced to something small, local, and understandable. Utility gems are good candidates. UI behavior is often a good candidate. Small helpers, formatters, adapters, wrappers, icon helpers, pagination - these are all plausible.

There are also very obvious cases where I would not do this. Authentication. Cryptography. Deeply stateful systems. Protocol-heavy libraries. Anything where the whole point of using a well-established dependency is that many eyes have already looked for bugs and edge cases.

My rule of thumb is simple.

If I can boil it down to a few files I can fully read and understand in one sitting, it is a candidate.
If I would need a week to understand it, I should probably keep the dependency.

## The ecosystem objection

There is an obvious critique here, which is that this sounds a bit parasitic.

If everybody starts treating gems as source material and nobody contributes back, the ecosystem gets weaker. The whole approach depends on strong libraries existing in the first place.

I think that concern is real.

At the same time, in many of these cases, what I am doing locally is not something that belongs upstream. I am removing features, narrowing scope, deleting abstractions, and adapting things to one application's needs. That is useful to me, but not necessarily useful to the gem.

If I find a real bug, discover a missing edge case, or make a genuinely reusable improvement, I should absolutely contribute that back. But the default operation here is usually subtraction rather than addition.

So I don't think this replaces open source contribution. I think it changes what role open source plays in the workflow.

## Bigger picture

That may be the larger shift here.

Maybe libraries become less valuable as things I install unchanged and more valuable as reference implementations, blueprints, and collections of hard-won ideas I can adapt to my own app.

That is not the end of gems. And it is not the end of open source. If anything, it depends on the ecosystem continuing to produce excellent libraries.

But it might be a shift in how I use them.

Less as permanent runtime dependencies.
More as source material I can study, reshape, and own.

## Ending

So the point is not that gems are bad.
And it is not that everything should be rewritten in-house.

The point is that the best alternative to a gem is often not building from scratch. It is owning a smaller version of the gem's core idea.

Gems are still valuable. I just increasingly think of them less as permanent tenants in my app and more as excellent blueprints.

That middle ground - between dependency and reinvention - is the part I find most interesting.
