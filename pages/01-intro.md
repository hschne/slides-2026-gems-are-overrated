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
- Let's start with something we're all familiar with, adding some gems.
- Let's say we need some small piece of functionality - some new feature, some new utility -in our Rails app. 
- Here I decided to pick on pagy, because it's such a nice example. We need pagination, so obviously we add the pagy gem.
- And that's all there is to it. We literally added three lines of code it works and that's all there is to it.
- Or is it?
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
-  We added a dependency, and that comes with some fine print.
- Prepare for dependabot alerts, supply chain attacks, upgrade stories. 
- It means dealing with things going unmaintained, funky maintainers
- And let's not even get into the ecosystem you actually buy into.
- Remember this from last autumn? Oh yeah
- And the funny part is, it's still worth it. We add gems because they save time.
- We buy into all that risk and all that bad stuff, because the alternatives are worse.
- Except I don't think that's necessarily true. I think there's a different way to think about using gems, and that's what I want to talk about today.
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
