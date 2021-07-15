import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class MajorCouncil extends Vue {
  public name = "Major-council";
  public localCouncil = "";
  public majorCouncil = "";
  public items = ["local council1", "local council2"];

  public submit() {

  }
}
