<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">File</div>
                    <div class="card-body">
                        <form>
                            <div class="custom-file">
                              <input type="file" class="custom-file-input" id="customFile" @change='fileChange()'>
                              <label class="custom-file-label" for="customFile">Choose file</label>
                          </div>
                      </form>
                  </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>

</style>
