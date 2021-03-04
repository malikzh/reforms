<template>
  <div class="reforms-file-output">
    <template v-if="value && value.name && value.url">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-auto">
              <template v-if="value.name && isImage(value.name)">
                <a :href="value.url" target="_blank">
                  <img alt="Image" :src="value.previewUrl || value.url" style="width: 50px; height: 50px;">
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
                {{ value.name }}
              </p>
              <p class="text-muted" style="font-size: 12px;" v-if="value.size">
                {{ fileSize(value.size) }}
              </p>
            </div>
            <div class="col-auto">
              <div class="row">
                <div class="col">
                  <a :href="value.url" download target="_blank" class="btn btn-sm btn-info">
                    &darr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

import ReformsFileMixin from "../ReformsFileMixin";

export default {
  name: "ReformsFileOutput",
  mixins: [ReformsFileMixin],
  props: {
    value: {
      type: Object,
      default: null,
    }
  },
};
</script>
