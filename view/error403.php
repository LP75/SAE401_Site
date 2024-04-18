<?php
header("HTTP/1.1 403 Forbidden");
?>
<div class="container">
    <div class="row justify-content-center align-items-center">
        <div class="col-12 text-center">
            <h1>Error 403 : Forbidden</h1>
            <button type="submit" class="btn btn-primary mt-3" id="homeReturn">Return to Home</button>
        </div>
    </div>
</div>
<script>
$(homeReturn).click(function(){
    window.location.href = "index.php?action=home";
})
</script>