<template>
  <v-container fluid>
    <v-card class="text-center" v-if="componentLoader" style="height:85vh;padding-top:32.5vh">
      <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      ></v-progress-circular>
    </v-card>
    <v-row v-if="mainComponent">
      <v-col cols="6">
        <v-select
          v-model="election2"
          :items="items2"
          item-text="name"
          item-value="id"
          label="Select Election"
          outlined
          @input = "selectElection(election2);"
        ></v-select>
      </v-col>
      
    
      <v-col cols="12" v-if="table">
        <v-col cols="6">
          <v-dialog v-model="dialog2" width="500" >
            <template v-slot:activator="{ on }">
              <v-btn color="red lighten-2" dark v-on="on" @click="newItem()">
                Add New
              </v-btn>
            </template>

            <v-card style="padding:20px;">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="selectType"
                    :items="selectTypeItem"
                    @change="itemChanged"
                    label="Select Type"
                    :rules="[v => !!v || 'Item is required']"
                    outlined
                  ></v-select>
                  <v-form  v-model="valid1" ref="form1">                  
                    <div v-if="bird">
                      <v-text-field
                        v-model="issue"
                        :rules="issueRule"
                        label
                        outlined required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                        </template>
                      </v-text-field>

                      <v-text-field
                        v-model="spectrum"
                        :rules="issueDescriptionRule"
                        label="Issue Description  (Max 250 Characters)"
                        outlined required
                      ></v-text-field>

                      <v-text-field
                        v-model="min"
                        label
                        :rules="[v => !!v || 'Item is required']"
                        outlined required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Min Limit
                        </template>
                      </v-text-field>

                      <v-text-field
                        v-model="max"
                        label
                        :rules="[v => !!v || 'Item is required']"
                        outlined required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Max Limit
                        </template>
                      </v-text-field>                      
                    </div>

                    <div v-if="text">
                      <!-- <v-select
                        v-model="election"
                        :items="items"
                        item-text="name"
                        item-value="id"
                        label="Select Election"
                        outlined
                      ></v-select> -->
                      <v-text-field
                        v-model="issueText"
                        label
                        :rules="issueRule"
                        outlined required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                        </template>
                      </v-text-field>

                      <v-text-field
                        :rules="issueDescriptionRule"
                        label="Issue Description (Max 250 Characters)"
                        outlined 
                      ></v-text-field>
                      
                    </div>

                    <div v-if="mcq">
                      <!-- <v-select
                        v-model="election"
                        :items="items"
                        item-text="name"
                        item-value="id"
                        label="Select Election"
                        outlined
                      ></v-select> -->
                      <v-text-field
                        v-model="issueMcq"
                        label
                        :rules="issueRule"
                        outlined required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                        </template>
                      </v-text-field>

                      <v-text-field
                        v-model="spectrumMcq"
                        label="Issue Description (Max 250 Characters)"
                        :rules="issueDescriptionRule"
                        outlined
                      ></v-text-field>

                      <!-- <v-text-field
                        v-model="minMcq"
                        label="Min Limit"
                        outlined
                      ></v-text-field>

                      <v-text-field
                        v-model="maxMcq"
                        label="Max Limit"
                        outlined
                      ></v-text-field> -->


                      <v-select
                        v-model="option"
                        :items="chooseOption"
                        label
                        :rules="[v => !!v || 'Item is required']"
                        outlined
                        @input="optionSelect(option)" required>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span>Choose Number of Answer
                        </template>
                      </v-select>
                      
                      <div v-for="(item,index) in answer" v-bind:key="index">
                        <v-text-field
                          v-model="answerVal[index]"
                          :rules="answerRule"
                          label                     
                          outlined required>
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>Answer (Max 100 Characters)
                          </template>
                        </v-text-field>  
                      </div>

                    </div>
                  </v-form>
                  <v-btn color="blue darken-1" dark @click="submit()" :disabled="!valid1" :loading="loading">Save</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-col>  
        <!-- new section start -->
        <v-data-table :headers="headers" :items="data" class="elevation-1" >

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="newItem()">New Item</v-btn>
              </template> -->
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="selectType"
                          :items="selectTypeItem"
                          @change="itemChanged"
                          label="Select Type"
                          :rules="[v => !!v || 'Item is required']"
                          outlined
                        ></v-select>
                        <v-form  v-model="valid" ref="form">                  
                        <div v-if="bird">
                          <!-- <v-select
                            v-model="election"
                            :items="items"
                            item-text="name"
                            item-value="id"
                            label="Select Election"
                            outlined
                          ></v-select> -->

                          <v-text-field
                            v-model="issue"
                            label
                            :rules="issueRule"
                            outlined required>
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                            </template>
                          </v-text-field>
                          
                          <v-text-field
                            v-model="spectrum"        
                            label="Issue Description (Max 250 Characters)"
                            :rules="issueDescriptionRule"
                            outlined
                          ></v-text-field>

                          <v-text-field
                            v-model="min"
                            label
                            :rules="[v => !!v || 'Item is required']"
                            outlined>
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Min Limit
                            </template>
                          </v-text-field>

                          <v-text-field
                            v-model="max"
                            label="Max Limit"
                            :rules="[v => !!v || 'Item is required']"
                            outlined>
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Max Limit
                            </template>
                          </v-text-field>                         
                        </div>

                        <div v-if="text">
                          <v-text-field
                            v-model="issueText"
                            label
                            :rules="issueRule"
                            outlined required>
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                            </template>
                          </v-text-field>

                          <v-text-field
                            v-model="spectrumText"
                            label="Issue Description (Max 250 Characters)"
                            :rules="issueDescriptionRule"                          
                            outlined
                          ></v-text-field>                          
                        </div>
                        
                        <div v-if="mcq">
                          <v-text-field
                            v-model="issueMcq"
                            label
                            :rules="issueRule"
                            outlined required>
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Issue (Max 80 Characters)
                            </template>
                          </v-text-field>

                          <v-text-field
                            v-model="spectrumMcq"
                            label="Issue Description (Max 250 Characters)"
                            :rules="issueDescriptionRule"
                            outlined
                          ></v-text-field>

                          <v-select
                            v-model="option"
                            :items="chooseOption"
                            label
                            :rules="[v => !!v || 'Item is required']"
                            outlined
                            @input="optionSelect(option)">
                            <template #label>
                              <span class="red--text"><strong>* </strong></span>Choose Number of Answer
                            </template> 
                          </v-select>
                          
                          <div v-for="(item,index) in answer" v-bind:key="item">
                            <v-text-field
                              v-model="answerVal[index]"
                              :rules="answerRule"
                              label="Answer"                     
                              outlined>
                              <template #label>
                                <span class="red--text"><strong>* </strong></span>Answer (Max 100 Characters)
                              </template>
                            </v-text-field>
                          </div>

                        </div>
                       </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
                  <v-btn color="blue darken-1" dark @click="editDataSave()" :disabled="!valid" :loading="loading">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <!-- <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon> -->
        </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" src = './PoliticalSpectrumList.ts'>
</script>

<style lang="scss" scoped>

</style>


