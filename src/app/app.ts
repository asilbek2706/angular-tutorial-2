import { Component } from '@angular/core';
import { Comments } from "./comments/comments";
import { Article } from './article/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', 
  imports: [Comments, Article],
})
export class App {
 
}

// @defer - Bu asosiy blok. Component yuklanayotganda, bu kod blokini kechiktirish uchun ishlatiladi. Bu foydalanuvchi tajribasini yaxshilashga yordam beradi, chunki asosiy tarkib tezroq yuklanadi va foydalanuvchi interaktiv bo'lishi mumkin.
// @placeholder - Bu kod blokini yuklashdan oldin ko'rsatiladigan o'rinbosar. Bu foydalanuvchilarga kontent yuklanayotganini ko'rsatadi va ularni kutishga undaydi.
// @loading - Bu kod blokini yuklash jarayonida ko'rsatiladigan yuklanish indikatorini belgilaydi. Bu foydalanuvchilarga kontent yuklanayotganini ko'rsatadi va ularni kutishga undaydi.
