<div class="container-fluid full-height">
    <div class="row full-height">
      <div class="col-md-2 border">
        <h2>Sort products</h2>
        <select class="form-select" id="selectOption" aria-label="Option select">
          <option disabled selected>Sort options</option>
          <option value="brand">Brand</option>
          <option value="category">Category</option>
          <option value="year">Year</option>
          <option value="price">Price</option>
        </select>
        <select class="d-none" id="selectParameter" aria-label="Parameter select">
        </select>
        <div class="d-none" id="priceDiv">
          <div class="row">
              <div class="col">
                  <div class="d-flex flex-row"> 
                      <select class="form-select me-2" id="selectMin" aria-label="Min select"></select>
                      <select class="form-select me-2" id="selectMax" aria-label="Max select"></select>
                  </div>
              </div>
          </div>
      </div>
      </div>
      <div class="col-md-10 border">
        <h2>Our Products</h2>
        <div class="overflow-auto" style="max-height: 90vh;">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Year</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody id="tbody">
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
</div>
