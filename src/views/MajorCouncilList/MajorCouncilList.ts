import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  },
})
export default class MajorCouncilList extends Vue {
  public dialog = false;
  public loading = false;
  public valid = true;
  public editIndex = 0;
  public editData: any = "";
  public baseUrl = "";
  public token = "";

  public componentLoader = false;
  public mainComponent = false;
  /*==== input fields variables ======*/
  public localCouncil = "";
  public majorBill = "";

  /*==== dropdown variables ======*/
  public items = [];

  /*==== data table varibles ======*/
  public headers = [
    { text: 'Id', value: 'majorBillId' },
    { text: 'Major Bill Name', value: 'majorBillName' },
    { text: 'Local Council Name', value: 'localCouncilName' },
    { text: 'Local Council Id', value: 'localCouncilId', align: ' d-none' },
    { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false },
  ];
  public data = [];

  /*======= operations ======*/
  public async created() {
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    // geting all distric list
    const districData = await axios.post(this.baseUrl + "get-all-local-council-list", {token: this.token});
    console.log(districData.data.data);
    const newDistData = districData.data.data.map((el: any) => {
      return {
        id: el.id,
        name: el.name,
      };
    });
    this.items = newDistData.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);

    // getting all local council data
    const resData = await axios.post(this.baseUrl + "get-all-major-bill-list", {token: this.token});
    const newData = resData.data.data.map((el: any) => {
      return {
        majorBillId: el.id,
        majorBillName: el.name,
        active: el.active,
        localCouncilId: el.localCouncil.id,
        localCouncilName: el.localCouncil.name,
      };
    });
    this.data = newData;
    this.componentLoader = false;
    this.mainComponent = true;
  }

  public async submit() {
    this.loading = true;
    if (this.editIndex === 0) {
      const data = {                       // New Insert
        token: this.token,
        name : this.majorBill.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        localCouncilId: this.localCouncil,
      };
      const resData = await axios.post(this.baseUrl + "add-edit-major-bill", data);
    } else {                                // Edits Records
      console.log(this.localCouncil);
      if (typeof(this.localCouncil) === "number") {
        const data = {
          token: this.token,
          name: this.majorBill.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
          localCouncilId: this.localCouncil,
          id: this.editData.majorBillId,
          active: this.editData.active,

      };
        console.log(data);
        const resData = await axios.post(this.baseUrl + "add-edit-major-bill", data);
        console.log(resData);
      } else {
        const data = {
            token: this.token,
            name: this.majorBill.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
            // @ts-ignore
            localCouncilId: this.localCouncil.id,
            id: this.editData.majorBillId,
            active: this.editData.active,

        };
        console.log(data);
        const resData = await axios.post(this.baseUrl + "add-edit-major-bill", data);
        console.log(resData);
      }
    }
    // getting all local council data
    const resData = await axios.post(this.baseUrl + "get-all-major-bill-list", {token: this.token});
    const newData = resData.data.data.map((el: any) => {
      return {
        majorBillId: el.id,
        majorBillName: el.name,
        active: el.active,
        localCouncilId: el.localCouncil.id,
        localCouncilName: el.localCouncil.name,
      };
    });
    this.data = newData;
    this.loading = false;
    this.dialog = false;
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0;
  }

  /* ===== choosing item for edit =====*/
  public async editItem(item: any) {
    this.majorBill = item.majorBillName;
    // @ts-ignore
    this.localCouncil = {name: item.localCouncilName, id: item.localCouncilId};
    this.dialog = true;
    this.editIndex = 1;
    this.editData = item;
    console.log(this.editData);
  }

  public newItem() {
    // @ts-ignore
    this.$refs.form.reset();
    this.editIndex = 0;
  }
}
