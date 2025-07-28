<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Achievement;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AchievementSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_achievements()
    {
        $user = User::factory()->create();
        $achievement = Achievement::factory()->create();
        $user->achievements()->attach($achievement);

        $response = $this->actingAs($user)->getJson('/api/achievements');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['name' => $achievement->name]);
    }
}
