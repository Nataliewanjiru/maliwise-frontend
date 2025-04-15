import { AfterViewInit, Component, ElementRef, Renderer2,PLATFORM_ID,Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  standalone:true
})
export class LandingPageComponent {
  @ViewChild('list', { static: false }) list!: ElementRef;
  @ViewChild('sliderTeams', { static: false }) sliderTeams!: ElementRef;
  listItems!: NodeListOf<HTMLElement>;

  nItems = 0;
  nView = 3;
  current = 0;
  isAuto = true;
  acAuto = 2500;
  autoSlider: any;

  constructor(private renderer: Renderer2,private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  features = [
    { title: 'Portfolio Management', description: 'Manage multiple investment portfolios with ease.' },
    { title: 'Investment Tracking', description: 'Track your investment real time' },
    { title: 'Risk Assessment', description: 'Understand your risk tolerance with personalized recommendations' },
    { title: 'Notifications and Alerts', description: 'Receive alerts about key changes in your portfolio.' },
    { title: 'Investment Recommendations', description: 'Automated suggestions based on your preferences.' },
    { title: 'Saving and Investment Goals', description: 'Track and set goals for your savings and investments.' }
  ];
  
  

  ngAfterViewInit() {
    this.listItems = this.list.nativeElement.querySelectorAll('li');
    this.nItems = this.listItems.length;
    this.initWidth();
    this.initEvents();

    if (isPlatformBrowser(this.platformId)) { // Run only in the browser
      import('bootstrap').then((bs) => {
        const carouselElement = this.el.nativeElement.querySelector('#mobileCarousel')
        if (carouselElement) {
          new bs.Carousel(carouselElement, {
            touch: true,
            interval: 3000,
            ride: 'carousel'
          });
        }
      });
      }
  }

  initWidth() {
    const list = this.list.nativeElement;
    this.renderer.setStyle(list, 'margin-left', `${~~(100 / this.nView)}%`);
    this.renderer.setStyle(list, 'width', `${~~(100 * (this.nItems / this.nView))}%`);

    this.listItems.forEach(item => {
      this.renderer.setStyle(item, 'width', `${100 / this.nItems}%`);
    });

    this.renderer.setStyle(this.sliderTeams.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.sliderTeams.nativeElement, 'display', 'block');
  }

  initEvents() {
    this.listItems.forEach((item, index) => {
      this.renderer.listen(item, 'click', (event) => {
        event.preventDefault();
        this.stopAutoSlide(index);
        this.moveSlider(item, index);
      });

      this.renderer.listen(item, 'touchstart', (event) => {
        event.preventDefault();
        this.stopAutoSlide(index);
        this.moveSlider(item, index);
      });
    });

    this.autoSlider = this.requestInterval(() => this.autoMove(), this.acAuto);
  }

  moveSlider(item: HTMLElement, index: number) {
    this.listItems.forEach(li => li.querySelector('figure')?.classList.remove('active'));
    item.querySelector('figure')?.classList.add('active');

    const translateX = ~~((-(100 / this.nItems)) * index);
    this.renderer.setStyle(this.list.nativeElement, 'transform', `translateX(${translateX}%)`);
    this.renderer.setStyle(this.list.nativeElement, 'transition', `transform 1s cubic-bezier(0.4, 0, 0.2, 1)`);
  }

  autoMove(slideIndex?: number) {
    this.current = this.isAuto
      ? ~~((this.current + 1) % this.nItems)
      : slideIndex ?? this.current;

    const currentItem = this.listItems[this.current];
    this.moveSlider(currentItem, this.current);
  }

  stopAutoSlide(index: number) {
    this.clearRequestInterval(this.autoSlider);
    this.isAuto = false;
    this.autoMove(index);
  }

  // requestInterval and clearRequestInterval equivalents
  requestInterval(fn: Function, delay: number) {
    let start = new Date().getTime();
    const handle: any = {};

    const loop = () => {
      const current = new Date().getTime();
      const delta = current - start;

      if (delta >= delay) {
        fn();
        start = new Date().getTime();
      }

      handle.value = requestAnimationFrame(loop);
    };

    handle.value = requestAnimationFrame(loop);
    return handle;
  }

  clearRequestInterval(handle: any) {
    cancelAnimationFrame(handle.value);
  }
}
