<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class PermissionGate extends Component
{
    public $permission;

    /**
     * Create a new component instance.
     */
    public function __construct($permission)
    {
        $this->permission = $permission;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return function (array $data) {
            $user = auth()->user();
            if ($user && $user->hasPermission($this->permission)) {
                return $data['slot'];
            }
            return '';
        };
    }
}
