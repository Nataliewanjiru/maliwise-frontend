import { AfterViewInit, Component, ElementRef, Renderer2,PLATFORM_ID,Inject, ViewChild,Input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';



interface Feature {
  icon: string;
  title: string;
  description: string;
}



@Component({
  selector: 'app-landing-page',
  imports: [ LucideAngularModule,CommonModule,FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])],
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

  constructor(private renderer: Renderer2,public router: Router,private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  features = [
    { title: 'Portfolio Management', description: 'Manage multiple investment portfolios with ease.' },
    { title: 'Investment Tracking', description: 'Track your investment real time' },
    { title: 'Risk Assessment', description: 'Understand your risk tolerance with personalized recommendations' },
    { title: 'Notifications and Alerts', description: 'Receive alerts about key changes in your portfolio.' },
    { title: 'Investment Recommendations', description: 'Automated suggestions based on your preferences.' },
    { title: 'Saving and Investment Goals', description: 'Track and set goals for your savings and investments.' }
  ];

  features2: Feature[] = [
    {
      icon: 'graph-up',
      title: 'Smart Portfolio Analytics',
      description: 'Real-time tracking and insights for informed decision-making'
    },
    {
      icon: 'people',
      title: 'Group Investment Tools',
      description: 'Streamlined management for Chamas and Saccos'
    },
    {
      icon: 'coin',
      title: 'Curated Opportunities',
      description: 'Access to pre-vetted investment options'
    }
  ];


  
  categories = [
    {
      icon:"bi bi-graph-up-arrow fs-1 text-success mb-3",
      title: 'New Investors',
      description: 'Start investing smartly even with little experience.',
      backgroundImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbusinesstoday.co.ke%2Fwp-content%2Fuploads%2F2021%2F08%2FRichest-people-in-Kenya-and-NSE-768x768.png&f=1&nofb=1&ipt=d08087119f3902e702796e3a17243465639410292a0a1c1ab81de483b989411e'
    },
    {
      icon:"bi bi-people fs-1 text-primary mb-3",
      title: 'Professionals',
      description: 'Track group savings and individual investments with ease.',
      backgroundImage: 'https://cdn.pixabay.com/photo/2021/09/26/11/44/chair-6657317_960_720.jpg'
    },
    {
      icon: 'bi bi-briefcase fs-1 text-success mb-3',
      title: 'Business Owners',
      description: "Monitor your company's investment growth efficiently.",
      backgroundImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnation.africa%2Fresource%2Fimage%2F224618%2Flandscape_ratio3x2%2F1200%2F800%2Fb0097a2c81fcd880a68d63b949879726%2FCU%2Ffarmersimage.jpg&f=1&nofb=1&ipt=f8b51b9f685a5c18872395b9c25ea6e725d45b73285b572719cf163fa554bf0a',
    }
  ];

  testimonials = [
    {
      quote: 'Maliwise has completely changed how I manage my investments!',
      name: 'Wanjiru K.',
      title: 'Entrepreneur'
    },
    {
      quote: 'Finally a tool that makes financial growth feel simple and achievable.',
      name: 'Brian O.',
      title: 'Software Engineer'
    },
    {
      quote: 'I love how everything is organized and easy to track.',
      name: 'Tiffany M.',
      title: 'Student Investor'
    }
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

  goToRegister() {
    this.router.navigate(['/register']);
  }

  
}
