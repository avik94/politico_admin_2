import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
  components: {
  },
})


export default class PoliticalSpectrum extends Vue {

  public election = "";
  public name = "";
  public min = "";
  public max = "";
  public issue = "";

  public items = ["election1", "election2"];

  public submit() {

  }

}
