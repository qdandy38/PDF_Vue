import { defineStore } from "pinia";
const defaultState = {
	fileName: "",
	fileData: null,
	base64Prefix: "data:application/pdf;base64,",
	signImage: "",
	sequence: [], // 原始pdf-sequence
	downloadSequence:[]
};
export default defineStore("common", {
  state: () => ({ ...defaultState }),
	actions: {
		updFileName(name){
			this.fileName = name;
		},
		updFileData(data){
			this.fileData = data;
		},
		updSignImage(url){
			this.signImage = url;
		},
		updSequence(arr){
			this.sequence = [...arr];
		},
		updDownloadSequence(arr){
			// this.downloadSequence[order] = data;
			this.downloadSequence = [...arr];
		},
		resetAll(){
			this.fileName = "";
			this.fileData = null;
			this.signImage = "";
			this.sequence = [];
			this.downloadSequence = [];
		}
	},
	persist: {
    key: 'pinia-common',
    paths: [
			"fileName",
			"fileData",
			"base64Prefix",
			"signImage",
			"sequence",
			"downloadSequence"
    ]
  }
})