<nav class="navbar navbar-expand-lg bg-body-tertiary" style="height: 10vh;">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Menu</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link <?php if ($page=="home") echo "active"; ?>" href="index.php?action=home">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link <?php if ($page=="products") echo "active"; ?>" href="index.php?action=products">Products</a>
            </li>
            <li class="nav-item dropdown client">
            <a class="nav-link dropdown-toggle <?php if ($page=="consultation" || $page=="addition" || $page=="modification" || $page=="deletion") echo "active"; ?>" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Administration
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item employee<?php if ($page=="consultation") echo "active"; ?>" href="index.php?action=consultation">Consultation</a></li>
                <li><a class="dropdown-item <?php if ($page=="addition") echo "active"; ?>" href="index.php?action=addition">Addition</a></li>
                <li><a class="dropdown-item <?php if ($page=="modification") echo "active"; ?>" href="index.php?action=modification">Modification</a></li>
                <li><a class="dropdown-item <?php if ($page=="deletion") echo "active"; ?>" href="index.php?action=deletion">Deletion</a></li>
            </ul>
            </li>
            <li class="nav-item dropdown client">
            <a class="nav-link dropdown-toggle <?php if ($page=="account") echo "active"; ?>" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
            </a>
            <ul class="dropdown-menu">
                <li><a class="nav-link <?php if ($page=="account") echo "active"; ?>" href="index.php?action=account">Account</a></li>
                <li><a class="nav-link logout" href="index.php?action=logout">Log out</a></li>
            </ul>
            </li>
            <li class="nav-item employees">
            <a class="nav-link logout" href="index.php?action=logout">Log in</a>
            </li>
        </ul>
        </div>
    </div>
</nav>