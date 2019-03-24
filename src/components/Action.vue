<template>
      <div>
        <div
          class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <a href="/actionview"><strong class="d-inline-block mb-2 text-primary">{{poolEvent.title}}</strong></a>
            <div class="mb-1 text-muted"> - </div>
            <p
              class="card-text mb-auto"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, vero tempore sunt aliquam harum eveniet voluptas esse necessitatibus modi corporis doloribus aut ratione dolor ducimus ullam cum iusto alias quaerat?</p>
            <div>
              
            </div>
          </div>
          <div class="col-auto d-none d-lg-block">
            <svg
              class="bd-placeholder-img"
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
              aria-label="Placeholder: Thumbnail"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">logo</text>
            </svg>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "Action",
  props: ['poolEvent']
};
</script>

<style>
</style>
