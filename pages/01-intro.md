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
-->

---

# Hidden Costs

<PhotoPile :images="[
  './img/dependabots.png',
  './img/supplychain.png',
  './img/releases.png',
  './img/readme.png',
  './img/care.png',
  './img/drama.png',
]" />

<!--
- The issue is not that gems are bad. The issue is that we tend to stop the calculation too early.

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
layout: image
image: /img/rubyconf-at.png
---
