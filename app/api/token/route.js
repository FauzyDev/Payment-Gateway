import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request) {
    const { id, nameProduct, price, quantity } = await request.json()

    let transactions = {
        item_details: {
            name: nameProduct,
            price: price,
            quantity: quantity
        },
        transaction_details: {
            order_id: id,
            gross_amount: price * quantity
        }
    }

    const token = await snap.createTransactionToken(transactions)
    console.log(token)
    return NextResponse.json({ token })
}