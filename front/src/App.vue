<template>
  <div>
    <button class="btn" @click="reload">relaod</button>
    <div class="mail-list">
      <div class="mail-list__item" v-for="file in files" :key="file.file">
        <a :href="`files/${file.file}`">
          <span class="address">from</span>
          {{file.from.map(from=>from.name).join(",")}}
          <span class="address">to</span>
          {{file.to.map(to=>to.name).join(",")}}
          <span class="subject">{{file.subject}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => {
    return {
      files: []
    };
  },
  methods: {
    getFiles: async function() {
      const res = await fetch("api/files");
      this.files = await res.json();
    },
    reload: function() {
      location.reload();
    }
  },
  mounted: function() {
    this.getFiles();
  }
};
</script>

<style lang="scss">
.mail-list {
  padding: 1em;
  box-sizing: border-box;

  &__item {
    padding: 0.5em;
    box-sizing: border-box;

    &:hover {
      border: 1px solid gainsboro;
    }
  }

  & a {
    text-decoration: none;
    color: black;
  }
}
.address {
  padding: 0 10px;
  margin-left: 20px;
  background-color: aquamarine;
}
.subject {
  margin-left: 20px;
}

.btn {
  padding: 10px;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
}
</style>
