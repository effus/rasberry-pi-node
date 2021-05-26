<template>
    <b-navbar type="dark" class="bd-navbar" variant="dark" :sticky="true">
        <b-navbar-brand href="#"> RPi </b-navbar-brand>
        <b-navbar-nav>
            <li class="nav-item">
                <b-link :to="{name: 'System'}" class="nav-link">System</b-link>
            </li>
        </b-navbar-nav>
    </b-navbar>
</template>