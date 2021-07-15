import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  },
})
export default class ElectionList extends Vue {
  public dialog = false;
  public loading = false;
  public valid = true;
  public editIndex = 0;
  public editData: any = "";
  public baseUrl = "";
  public token = "";

  public componentLoader = false;
  public mainComponent = false;

  /*===== input fields variables ======*/
  public election = "";

  /*==== data table varibles =====*/
  public headers = [
    { text: 'Id', value: 'id' },
    { text: 'Election Name', value: 'name' },
    { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false },
  ];
  public data = [];


  /* ===== operations ===== */

  public async created() {
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token =  this.$store.state.token;
    const data = {
      token: this.token,
    };
    const resData = await axios.post(this.baseUrl + "get-all-election-list", data);
    this.data = resData.data.data;
    this.componentLoader = false;
    this.mainComponent = true;
  }

  public async submit() {
    this.loading = true;
    if (this.editIndex === 0) {
      const data = {
        token: this.$store.state.token,
        name : this.election.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-election", data);
    } else {
      const data = {
        token: this.token,
        name : this.election.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        id   : this.editData.id,
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-election", data);
    }
    const dataTable = {
      token: this.token,
    };
    const resDataTable = await axios.post(this.baseUrl + "get-all-election-list", dataTable);
    this.data = resDataTable.data.data;

    this.loading = false;
    this.dialog = false;
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0;
  }

  /* ===== choosing item for edit =====*/
  public async editItem(item: any) {
    this.election = item.name;
    this.dialog = true;
    this.editIndex = 1;
    this.editData = item;
  }

  public newItem() {
    if (this.election != "") {
      // @ts-ignore
      this.$refs.form.reset();
    }
    this.editIndex = 0;
  }
}
