<template>
  <v-app>
    <v-app-bar app dense elevate-on-scroll color="primary">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn rounded text :loading="loading" v-on="on" color="accent" @click="reload">
            <v-icon tag="a">mdi-reload</v-icon>Reload
          </v-btn>
        </template>
        <span>連打厳禁</span>
      </v-tooltip>
      <v-toolbar-title class="ml-10">.eml observer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-list>
          <template v-for="(file, ridx) in files">
            <v-list-item three-line :key="'r_'+ridx">
              <v-list-item-content>
                <div class="overline" :class="dateClass(file)">{{formatDate(file.date)}}</div>
                <v-list-item-title class="headline mb-1">{{file.subject}}</v-list-item-title>
                <v-list-item-subtitle>
                  <span class="fromto-label">FROM:</span>
                  <v-chip
                    class="ml-2"
                    color="orange"
                    dark
                    small
                    v-for="from in file.from"
                    :key="`r_${ridx}_from_${from.address}`"
                  >
                    {{from.address}}
                    <!-- <template v-if="from.name">({{from.name}})</template> -->
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <span class="fromto-label">TO:</span>
                  <v-chip
                    class="ml-2"
                    color="light-blue"
                    dark
                    small
                    v-for="to in file.to"
                    :key="`r_${ridx}_to_${to.address}`"
                  >
                    {{to.address}}
                    <!-- <template v-if="to.name">({{to.name}})</template> -->
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn x-large outlined color="primary" :href="`files/${file.file}`">
                <v-icon tag="a">mdi-download-outline</v-icon>Download
              </v-btn>
            </v-list-item>
            <v-divider :key="'d_'+ridx"></v-divider>
          </template>
        </v-list>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => {
    return {
      files: [
        // {
        //   file: "hoge.txt",
        //   from: [{ name: "hoge", address: "fsdfdfp@xxx.com" }],
        //   to: [
        //     { name: "hoge1", address: "fsdfdf11cccc1p@xxx.com" },
        //     { name: "hoge1", address: "fsdfdffdsf111p@xxx.com" },
        //     { name: "hoge1", address: "fsdfdf122211p@xxx.com" }
        //   ],
        //   subject: "sample mail",
        //   date: new Date()
        // },
        // {
        //   file: "hoge2.txt",
        //   from: [{ name: "hogesd", address: "fsdfdfp@xxx.com" }],
        //   to: [{ name: "hoge1dd", address: "fsdfdf111p@xxx.com" }],
        //   subject: "sample maildddd",
        //   date: new Date()
        // }
      ],
      loading: false,
      lastReloaded: null
    };
  },
  methods: {
    fetchFiles: async function() {
      const res = await fetch("api/files");
      const files = await res.json();
      this.files = files
        .map(file => {
          return { ...file, date: new Date(file.date) };
        })
        .sort((p, n) => n.date.getTime() - p.date.getTime());
    },
    reload: function() {
      if (this.loading) return;
      this.loading = true;
      this.fetchFiles().finally(() => {
        this.loading = false;
        this.lastReloaded = new Date();
      });
    },
    formatDate: function(date) {
      return `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    dateClass: function(file) {
      return {
        "new-file": file.date > this.lastReloaded
      };
    }
  },
  mounted: function() {
    this.reload();
  }
};
</script>

<style lang="scss">
a.v-icon {
  outline: none;
}

.new-file {
  color: red;
}

.container {
  max-width: 980px;
}

.fromto-label {
  display: inline-block;
  width: 50px;
  text-align: right;
}
</style>
