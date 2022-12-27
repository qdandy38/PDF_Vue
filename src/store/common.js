import { defineStore } from "pinia";
const defaultState = {
	fileName: "",
	fileData: null,
	base64Prefix: "data:application/pdf;base64,"
};
export default defineStore("common", {
  state: () => ({ ...defaultState }),
	actions: {
		updFileName(name){
			this.fileName = name;
		},
		updFileData(data){
			this.fileData = data;
		}
	},
	persist: {
    key: 'pinia-common',
    paths: [
			"fileName",
			"fileData",
			"base64Prefix"
    ]
  }
})