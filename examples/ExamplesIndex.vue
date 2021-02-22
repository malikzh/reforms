<template>
  <div class="container">
    <header class="pt-4 mb-4">
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <a class="navbar-brand" href="javascript:void(0);">
            R E F O R M S
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  INPUTS / OUTPUTS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  FORMS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  CARDS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main class="mb-2">
      <div class="row mb-2">
        <div class="col-12">
          <h4 class="text-center">
            INPUTS / OUTPUTS
          </h4>

          <div class="card mt-4">
            <div class="card-body">
              <inputs-outputs />
              <hr>
              dddd
              <hr>
              <reforms-form v-model="datas">
                <reforms-input name="kik" type="group" multiple>
                  <reforms-input name="da" />
                  <reforms-input name="ta" />
                </reforms-input>
              </reforms-form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="row text-muted">
        <div class="col-6">
          Copyright &copy; 2021 EMPLA GROUP, LLP
        </div>
        <div class="col-6 text-end">
          v{{ version }}
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import InputsOutputs from "./InputsOutputs";
import pkg from '../package.json'
import ReformsInput from "../src/ReformsInput";
export default {
  name: "ExampleIndex",
  components: {ReformsInput, InputsOutputs},
  data() {
    return {
      version: pkg.version,
      datas: {},
    }
  }
};
</script>
