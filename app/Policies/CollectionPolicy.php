<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Collection;
use Illuminate\Auth\Access\HandlesAuthorization;

class CollectionPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Collection $collection)
    {
        return $user->id === $collection->user_id;
    }

    public function update(User $user, Collection $collection)
    {
        return $user->id === $collection->user_id;
    }

    public function delete(User $user, Collection $collection)
    {
        return $user->id === $collection->user_id;
    }
}
