<div class="container center-container">
    <h1>Modifications</h1>
    <h2>Type of modification</h2>
    <select class="form-select" id="selectType">
        <option disabled selected>Type of modification</option>
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
    </div>
</div>
<div class="d-none" id="form">
    <h2>Fill in the parameters</h2>
    <div class="d-none type" id="brands">
        <div class="form-group">
            <label>Brand name</label>
            <input type="text" class="form-control required" id="brand_name" placeholder="brand name" name="brand_name">
        </div>
    </div>
    <div class="d-none type" id="categories">
        <div class="form-group">
            <label>Category name</label>
            <input type="text" class="form-control required" id="category_name" placeholder="category name" name="category_name">
        </div>
    </div>
    <div class="d-none type" id="stores">
        <div class="form-group">
            <label>Store name</label>
            <input type="text" class="form-control required" id="store_name" placeholder="store name" name="store_name">
        </div>
        <div class="form-group phone">
            <label>Phone</label>
            <input type="text" class="form-control required" id="phone" placeholder="phone number" name="phone">
        </div>
        <div class="form-group">
            <label>email</label>
            <input type="email" class="form-control required" id="email" placeholder="email" name="email">
        </div>
        <div class="form-group">
            <label>Street address</label>
            <input type="text" class="form-control required" id="street" placeholder="street address" name="street">
        </div>
        <div class="form-group">
            <label>City</label>
            <input type="text" class="form-control required" id="city" placeholder="city" name="city">
        </div>
        <div class="form-group state">
            <label>State</label>
            <input type="text" class="form-control required" id="state" placeholder="state" name="state">
        </div>
        <div class="form-group zipcode">
            <label>Zip code</label>
            <input type="text" class="form-control required" id="zip_code" pattern="\d*" placeholder="zip code" name="zip_code">
        </div>
    </div>
    <div class="d-none type" id="products">
        <div class="form-group product_name">
            <label>Product name</label>
            <input type="text" class="form-control required" id="product_name" placeholder="product name" name="product_name">
        </div>
        <div class="form-group model_year">
            <label>Model year</label>
            <input type="text" class="form-control required" id="model_year" placeholder="model year" name="model_year">
        </div>
        <div class="form-group list_price">
            <label>List price</label>
            <input type="text" class="form-control required" id="list_price" placeholder="list price" name="list_price">
        </div>
        <div class="form-group">
            <label>Brand</label>
            <select class="form-select required" id="brandProduct" name="brand_id">
                <option disabled selected>Select a brand</option>
            </select>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select class="form-select required" id="catProduct" name="category_id">
                <option disabled selected>Select a category</option>
            </select>
        </div>
    </div>
    <div class="d-none type" id="stocks">
        <div class="form-group quantity">
            <label>Quantity</label>
            <input type="text" class="form-control required" id="quantity" placeholder="Enter a number" name="quantity">
        </div>
        <div class="d-none">
            <label>Store</label>
            <input type="text" class="form-control required" id="store_id" name="store_id">
        </div>
        <div class="d-none">
            <label>Product</label>
            <input type="text" class="form-control required" id="product_id" name="product_id">
        </div>
    </div>
    <div class="d-none type" id="employees">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control required" id="employee_name" placeholder="employee name" name="employee_name">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control required" id="employee_email" placeholder="employee email" name="employee_email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="text" class="form-control required" id="employee_password" placeholder="employee password" name="employee_password">
        </div>
        <div class="form-group">
            <label>Role</label>
            <select class="form-select required" id="role" name="employee_role">
                <option disabled selected>Select a role</option>
                <option value="employee">Employee</option>
            </select>
        </div>
        <div class="form-group">
            <label>Product</label>
            <select class="form-select required" id="storeEmployee" name="store_id">
                <option disabled selected>Select a store</option>
            </select>
        </div>
    </div>
    <button class="btn btn-primary" id="add">Add to the database</button>
</div>