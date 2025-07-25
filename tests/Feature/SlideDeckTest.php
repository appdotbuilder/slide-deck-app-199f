<?php

it('displays slide deck on welcome page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
    );
});

it('displays slide deck on home route', function () {
    $response = $this->get(route('home'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
    );
});