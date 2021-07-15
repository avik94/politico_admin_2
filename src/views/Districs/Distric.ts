import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
  components: {
  },
})


export default class Distric extends Vue {
  public name = "Distric";
  public distric = "";
  public state = "";
  public items = [
    "Stat1", "State2",
  ];

  public submit() {

  }
}
