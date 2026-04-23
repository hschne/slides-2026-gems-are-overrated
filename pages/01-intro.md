# Gems Are Great!

```ruby [Gemfile]
gem "pagy"
```

```ruby [app/controllers/products_controller.rb]
def index
  @pagy, @products = pagy(:offset, Product.all)
end
```

```html [app/views/products/index.html.erb]
<%== @pagy.series_nav %>
```

<!--
- Let's start with something we're all familiar with
- We are working on some application and need some new feature or functionliaty
- Let's say we need pagination.
- We're responsible developers, so we google or ask our LLM for the best pagination gem to use.
- It tells us to use Pagy, so that's what we add to our Gemfile.
- We follow the instructions, add some code to our controllers and our views and we are done.
- That' all it is. Actually gems are great, maybe my title should have been Gems are underrated.
- Except those lines of code is not all we did.
-->

---

# Additional Costs

<PhotoPile :images="[
  './img/dependabots.png',
  './img/supplychain.png',
  './img/releases.png',
  './img/readme.png',
  './img/care.png',
  './img/drama.png',
]" />

<!--
- We added a dependency, and dependencies come with costs - the dependency tax.
- Prepare for dependabot alerts, supply chain attacks, upgrade stories. 
- It means dealing with things going unmaintained, funky maintainers
- And let's not even get into the ecosystem you actually buy into.
- Remember this from last autumn? Oh yeah
- And the funny part is, for the most party, we're aware of these issues
- but we still accept them, we pay the dependency tax because it's still worth it.
-->

---
layout: quote
---

> Gems are the worst form of dependency management except all the others.

— Winston Churchill

<!--
- Because the alternatives are worse.
- Even Churchill said something along those lines. Or he surely would have if Gems had been around at that time.
- Except I don't think that's necessarily true anymore.
- Today, there's a very viable alternative to using gems
- And a whole new way to think about dependencies overall
- That's what I want to talk about today.
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
Short plug, RubyConf Austria is the first ruby conf in Vienna since 2018 (which was Euroku), damn I'm old.
-->

---
layout: image
image: /img/rubyconf-at.png
---

<!--
- Vienna is a 3 and half hour train ride from here, it's a single track conference conference. We got a killer roster of speakers
- Check it out, or hit me up afterwards if you got questions.
-->
