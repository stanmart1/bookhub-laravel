<?php

namespace Database\Factories;

use App\Models\PaymentProof;
use App\Models\User;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentProofFactory extends Factory
{
    protected $model = PaymentProof::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'order_id' => Order::factory(),
            'file_path' => 'payment-proofs/' . $this->faker->uuid . '.jpg',
            'status' => 'pending',
        ];
    }
}
