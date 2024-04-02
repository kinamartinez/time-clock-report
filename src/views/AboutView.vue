<template>
  <v-container fluid class="background-container">
    <div class="about mt-0 pt-0" >
      <v-card
        class="mx-auto"
        max-width="600"
      >
        <v-img
          src="card-background.jpg"
          class="align-end text-white"
          height="200"
          cover
        >
          <v-avatar
            color="grey"
            size="150"
          >
            <v-img src="karina.jpg" cover></v-img>
          </v-avatar>
          <v-card-title>Karina Martinez</v-card-title>
        </v-img>
        <v-card-text>
          <p>As a web developer, I am driven by a passion for problem-solving. I thrive on challenges and approach each task with enthusiasm, creativity, and a commitment to self-improvement. Known for my dedication, diligence, and sense of responsibility, I excel both independently and as part of a collaborative team environment. I am continuously expanding my knowledge and skills, eagerly applying them to new projects as I strive for excellence in every pursuit.</p>
        </v-card-text>

        <v-card-actions>
          <v-btn size="x-large" color="blue"  class="linkedin-btn" >
            <v-icon icon="mdi-linkedin" @click="openLink" />
          </v-btn>

          <v-btn size="x-large" color="black" class="github-btn" >
            <v-icon icon="mdi-github" @click="openGitHub"></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  methods: {
    openLink() {
      window.open('https://www.linkedin.com/in/karina-martinez-aab2ab129/', '_blank');
    },
    openGitHub() {
      window.open('https://github.com/kinamartinez', '_blank');
    }
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 90vh;
    display: flex;
    align-items: center;
  }
}
</style>
