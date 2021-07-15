import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from 'axios';
import Test from '../../components/Test.vue';

@Component({
  components: {
    Test,
  },
})
export default class PoliticalSpectrumList extends Vue {
  public dialog = false;
  public dialog2 = false;
  public loading = false;
  public valid = true;
  public valid1 = true;
  public editIndex = 0;
  public editData: any = "";
  public baseUrl = "";
  public token = "";

  public componentLoader = false;
  public mainComponent = false;

  public table = false;

  /*==== input fields variables ======*/
  public election = "";
  public election2 = "";
  public spectrum = "";
  public min = "";
  public max = "";
  public issue = "";

  public spectrumText = "";
  public issueText = "";

  public spectrumMcq = "";
  public issueMcq = "";
  public minMcq = "";
  public maxMcq = "";

  /*===== dropdown variables ======*/
  public items = [];
  public items2 = [];
  /*===== type dropdown =====*/
  public selectTypeItem = ["bard", "mcq", "text"];
  public chooseOption = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  public selectType = "";

  public answer: any = [];
  public answerVal: any = [];

  public bird = false;
  public mcq = false;
  public text = false;
  // buttonSubmit = false;
  public option = "";

  /*===== data table varibles ======*/
  public headers = [
    { text: 'Id', value: 'id' },
    { text: 'Issue', value: 'issueName' },
    { text: 'Issue Description', value: 'spectrum' },
    { text: 'Min', value: 'lowText' },
    { text: 'Max', value: 'highText' },
    { text: 'Answer', value: 'answers' },
    { text: 'Type', value: 'type' },
    // { text: 'Election Name', value: 'electionName' },
    // { text: 'Election Id', value: 'electionId', align: ' d-none' },
    // { text: 'Active', value: 'active', align: ' d-none' },
    { text: 'Actions', value: 'action', sortable: false },
  ];
  public data: any = [ ];
  public answerRule = [
    (v: any) => !!v || 'Item is required',
    (v: any) => (v || '').length <= 100 || 'Max 100 Characters',
  ];

  public issueRule = [
    (v: any) => !!v || 'Item is required',
    (v: any) => (v || '').length <= 80 || 'Max 80 Characters',
  ];

  public issueDescriptionRule = [
    (v: any) => (v || '').length <= 250 || 'Max 250 Characters',
  ];

  /*======= operations ======*/
  public async created() {
    this.componentLoader = true;
    this.mainComponent = false;
    this.baseUrl = this.$store.state.baseUrl;
    this.token = this.$store.state.token;
    console.log(this.token);
    // geting all distric list
    const districData = await axios.post(this.baseUrl + "get-all-election-list", {token: this.token});
    // console.log(districData.data.data)
    const newDistData = districData.data.data.map((el: any) => {
      return {
        id: el.id,
        name: el.name,
      };
    });
    // sorting the election
    newDistData.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
    this.items = newDistData;
    this.items2 = newDistData;
    this.componentLoader = false;
    this.mainComponent = true;
  }


  public async submit() {
    this.loading = true;
    if (this.selectType === "mcq") {
      const data = {                       // New Insert
          token: this.token,
          name : this.spectrumMcq.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
          electionId: this.election2,
          issue: this.issueMcq.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
          type: this.selectType,
          answers: [...this.answerVal],
        };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      console.log(resData.data.data);
    } else if (this.selectType === "bard") {
      const data = {
        token: this.token,
        name : this.spectrum.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        electionId: this.election2,
        minName: this.min.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        maxName: this.max.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        issue: this.issue.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        type: this.selectType,
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      // console.log(resData.data.data)
    } else if (this.selectType === "text") {
      const data = {
        token: this.token,
        name : this.spectrumText.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        electionId: this.election2,
        issue: this.issueText.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        type: this.selectType,
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      // console.log(resData.data.data)
    }
    this.loading = false;
    this.dialog2 = false;
    const res = await axios.post(this.baseUrl + "get-political-spectrum-list", {
      token: this.token,
      electionId: this.election2,
    });
    this.data = this.formatResponse(res.data.data);
    this.election2 = this.election2;
  }

  public async editDataSave() {
    this.loading = true;
    if (this.selectType === "mcq") {
      const data = {
        token: this.token,
        name : this.spectrumMcq.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        electionId: this.election2,
        issue: this.issueMcq.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        type: this.selectType,
        id: this.editData.id,
        answers: [...this.answerVal],
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      console.log(resData.data);
      const res = await axios.post(this.baseUrl + "get-political-spectrum-list", {
        token: this.token,
        electionId: this.election2,
      });
      this.data = this.formatResponse(res.data.data);
      this.election2 = this.election2;

    } else if (this.selectType === "bard") {
      const data = {
        token: this.token,
        name : this.spectrum.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        electionId: this.election2,
        minName: this.min.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        maxName: this.max.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        id: this.editData.id,
        issue: this.issue.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        type: this.selectType,
        answers: [],
      };
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      const res = await axios.post(this.baseUrl + "get-political-spectrum-list", {
        token: this.token,
        electionId: this.election2,
      });
      this.data = this.formatResponse(res.data.data);
      this.election2 = this.election2;

    } else if (this.selectType === "text") {
      const data = {
        token: this.token,
        name : this.spectrumText.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        electionId: this.election2,
        id: this.editData.id,
        issue: this.issueText.replace(/\b[a-z]/g, (x) => x.toUpperCase()),
        type: this.selectType,
        answers: [],
      };
      console.log(data);
      const resData = await axios.post(this.baseUrl + "add-edit-political-spectrum", data);
      const res = await axios.post(this.baseUrl + "get-political-spectrum-list", {
        token: this.token,
        // @ts-ignore
        electionId: this.election2,
      });
      this.data = this.formatResponse(res.data.data);
      this.election2 = this.election2;
    }
    this.loading = false;
    this.dialog = false;

  }
  /* ===== choosing item for edit =====*/
  public async editItem(item: any) {
    this.selectType = item.type;
    console.log(this.selectType);
    if (item.type === "bard") {
      this.bird = true;
      this.text = false;
      this.mcq = false;
      this.spectrum = item.spectrum;
      this.min = item.lowText;
      this.max = item.highText;
      this.issue = item.issueName;
    } else if (item.type  === "mcq") {
      this.answer = [];
      this.answerVal = [];
      this.bird = false;
      this.text = false;
      this.mcq = true;
      this.spectrumMcq = item.spectrum;
      this.issueMcq = item.issueName;
      // this.minMcq = item.lowText;
      // this.maxMcq = item.highText;
      const x = item.answers.split(" | ");
      this.answerVal = x;
      for (const i of x) {
        this.answer.push("");
      }
      // @ts-ignore
      this.option = this.answer.length;
    } else if (item.type  === "text") {
      this.bird = false;
      this.text = true;
      this.mcq = false;
      this.spectrumText = item.spectrum;
      this.issueText = item.issueName;
    }
    this.dialog = true;
    this.editData = item;
    console.log(this.editData);
  }

  public newItem() {
    this.selectType = "mcq";

    this.bird = false;
    this.text = false;
    this.mcq = true;
    this.spectrum = "";
    this.min = "";
    this.max = "";
    this.issue = "";

    this.spectrumText = "";
    this.issueText = "";

    this.spectrumMcq = "";
    this.issueMcq = "";
    this.minMcq = "";
    this.maxMcq = "";

    // @ts-ignore

  }

  public async selectElection(item: any) {
    console.log(item);
    const data = {
      token: this.token,
      electionId: item,
    };
    console.log(data);
    const res = await axios.post(this.baseUrl + "get-political-spectrum-list", data);
    const arr = this.formatResponse(res.data.data);

    console.log(arr);
    this.data = arr;
    this.table = true;
  }

  // type checking
  public itemChanged(data: any) {
    // console.log(data);
    if (data === "bard") {
      this.bird = true;
      this.text = false;
      this.mcq = false;
    } else if (data === "mcq") {
      this.bird = false;
      this.text = false;
      this.mcq = true;
    } else if (data === "text") {
      this.bird = false;
      this.text = true;
      this.mcq = false;
    }
    // @ts-ignore
    this.$refs.form.reset();
  }

  public optionSelect(data: any) {
    // console.log(data);
    this.answer = [];
    this.answerVal = [];
    for (let i = 1; i <= data; i++) {
      console.log(i);
      this.answer.push("");
      this.answerVal.push("");
    }

  }

  public formatResponse(data: any) {
    const arr = [];
    for (const el of data) {
      if (el.answers) {
        // console.log(el.answers.join("|"))
        arr.push({
          id: el.id,
          spectrum: el.spectrum,
          issueName: el.issueName,
          lowText: el.lowText,
          highText: el.highText,
          type: el.type,
          answers: el.answers.join(" | "),
        });
      } else {
        arr.push({
          id: el.id,
          spectrum: el.spectrum,
          issueName: el.issueName,
          lowText: el.lowText,
          highText: el.highText,
          type: el.type,
          answers: el.answers,
        });
      }
    }
    return arr;
  }
}
