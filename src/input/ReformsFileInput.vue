<template>
  <div class="reforms-input">
    <div class="row" v-if="state === 'empty'">
      <div class="col-12">
        <input @change="onFileSelect" type="file" ref="input" :id="id" class="form-control" :class="classes">
      </div>
    </div>
    <div class="row align-items-center" v-else-if="state === 'uploading'" style="height: 38px">
      <div class="col">
        <div class="text-center mb-2 text-muted">
          <b>{{ uploadProgress }}%</b>
        </div>
        <div class="progress" style="height: 5px;">
          <div class="progress-bar" :style="{width: uploadProgress + '%'}"></div>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="state === 'file' && currentFile">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <template v-if="currentFile.name && isImage(currentFile.name)">
                  <a :href="currentFile.url" target="_blank">
                    <img alt="Image" :src="currentFile.previewUrl || currentFile.url" style="width: 50px; height: 50px;">
                  </a>
                </template>
                <template v-else>
                  <div class="card">
                    <div class="card-body">
                      <div class="row align-items-center justify-content-center" style="width: 50px; height: 50px;">
                        <div class="col-auto">
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col">
                <p>
                  {{ currentFile.name }}
                </p>
                <p class="text-muted" style="font-size: 12px;" v-if="currentFile.size">
                  {{ fileSize(currentFile.size) }}
                </p>
              </div>
              <div class="col-auto">
                <div class="row">
                  <div class="col">
                    <a :href="currentFile.url" download target="_blank" class="btn btn-sm btn-info">
                      &darr;
                    </a>
                  </div>
                  <div class="col" v-if="deleteButton">
                    <button @click.prevent="onDelete" type="button" class="btn btn-sm btn-danger">
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReformsInputMixin from "../ReformsInputMixin";
import {mergeClasses, modelValue} from "../Util";
import {toRef, watch, toRaw} from 'vue';
import ReformsFileMixin from "../ReformsFileMixin";

export default {
  name: "ReformsFileInput",
  inheritAttrs: false,
  mixins: [ReformsInputMixin, ReformsFileMixin],
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    readonly: Boolean,
    placeholder: String,
    tabindex: String,
    autocomplete: String,
    uploadName: {
      type: String,
      default: 'file',
    },
    uploadUrl: {
      type: String,
      required: true,
    },
    uploadedHandler: {
      type: Function,
      default: (data) => data,
    },
    deleteUrl: String,
    deleteButton: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      state: 'empty', // empty, uploading, file
      uploadProgress: 0,
    };
  },
  computed: {
    inputValue: modelValue(),
    classes() {
      return mergeClasses(this.inputClass, {
        'is-valid': this.isValid === true,
        'is-invalid': this.isValid === false,
      });
    },
    currentFile: {
      get() {
        return this.modelValue || {};
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    onFileSelect(e) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append(this.uploadName, file);

      let xhr = new XMLHttpRequest();

      const form = this.findForm();

      if (form) {
        form.formLoadingMode = true;
      }

      xhr.upload.addEventListener('progress', (e) => {
        if (e.loaded <= file.size) {
          this.uploadProgress = Math.round(e.loaded / file.size * 100);
        }

        if (e.loaded === e.total) {
          this.uploadProgress = 100;
        }
      });


      xhr.onload = (e) => {
        const resp = JSON.parse(e.target.response);
        this.currentFile = this.uploadedHandler(resp);
        this.state = 'file';

        if (form) {
          form.formLoadingMode = false;
        }
      };

      xhr.open("POST", this.uploadUrl);
      xhr.setRequestHeader('Accept', 'application/json');

      this.state = 'uploading';

      xhr.send(formData);
    },
    onDelete() {
      new Promise((resolve, reject) => {
        if (this.deleteUrl) {
          fetch(this.deleteUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(this.currentFile),
          }).then(resolve).catch(reject);
        } else {
          resolve();
        }
      }).then(() => {
          this.currentFile = null;
          this.state = 'empty';
      });
    },
    findForm() {
      let item = this.$parent;

      while (item && !_.isBoolean(item.formLoadingMode)) {
        item = item.$parent;
      }

      if (!_.isBoolean(item.formLoadingMode)) {
        return null;
      }

      return item;
    }
  },
}
</script>
