import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component
export default class LocalCouncil extends Vue {
  public name = "Local-Council";
  public distric = "";
  public localCouncil = "";
  public items = ["distric1", "distric2"];

  public created() {}

  public submit() {

  }
}
