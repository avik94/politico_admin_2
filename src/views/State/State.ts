import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  },
})
export default class State extends Vue {
  public name = "State";

  public state = "";

  public submit() {

  }
}
