<div class="container center-container">
    <h1>Deletion</h1>
    <h2>Type of deletion</h2>
    <select class="form-select" id="selectType">
        <option disabled selected>Type of deletion</option>
        <option value="brands">Brand</option>
        <option value="categories">Category</option>
        <option value="stores">Store</option>
        <option value="products">Product</option>
        <option value="stocks">Stock</option>
    </select>
    <div class="d-none" id="selectStoreDiv">
        <h2>Choose a store</h2>
        <select class="form-select" id="selectStore">
            <option disabled selected>Select a store</option>
        </select>
    </div>
    <div class="d-none" id="selectItemDiv">
        <h2>Choose item</h2>
        <select class="form-select" id="selectItem">
            <option disabled selected id="firstSelectItem"></option>
        </select>
        <button class="btn btn-primary" id="add" disabled>Delete from the database</button>
    </div>
</div>
