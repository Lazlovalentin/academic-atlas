import {
  type IBenefitsItem,
  type IOrderStep,
  type IServiceItem,
  type Slide,
  type IPartnershipBenefits,
  type IWorkflow,
  type IRequirements,
  type IAccession,
  type IAboutUs,
  type IQuestions,
  type IHeroGrid,
  BenefitLabel,
  IconName,
  QuestionAnswer,
  QuestionTitle,
  WorkType,
  ILegalInfoArticle,
} from '../types';

export const getBenefits = (): IBenefitsItem[] => {
  return [
    {
      icon: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    },
    {
      icon: IconName.Benefits2,
      label: BenefitLabel.Guarantee,
    },
    {
      icon: IconName.Benefits3,
      label: BenefitLabel.Correction,
    },
    {
      icon: IconName.Benefits4,
      label: BenefitLabel.Support,
    },
  ];
};

export const getFeedbackSlides = (): Slide[] => {
  return [
    {
      memberName: 'Дарина Заєць',
      memberFeedback:
        "Дякую за чудові послуги! Робота виконана якісно та вчасно, співпраця була дуже продуктивною. Ваш професіоналізм та увага до деталей вражають. Обов'язково звернусь ще раз і рекомендую іншим!",
      memberImage: '/images/customer-2.webp',
      memberAlt: 'Daryna Zaec',
      memberRating: 5,
    },
    {
      memberName: 'Андрій Білка',
      memberFeedback:
        'Дякую за відмінне обслуговування! Робота виконана на вищому рівні, співпраця була ефективною і комфортною. Рекомендую всім, хто шукає якісні послуги!',
      memberImage: '/images/customer-1.webp',
      memberAlt: 'Andrii Bilka',
      memberRating: 4,
    },
    {
      memberName: 'Петро Вовк',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-3.webp',
      memberAlt: 'Petro Vovk',
      memberRating: 5,
    },
    {
      memberName: 'Данило Ведмідь',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-1.webp',
      memberAlt: 'Danylo Wedmid',
      memberRating: 5,
    },
    {
      memberName: 'Семен Лисиця',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-3.webp',
      memberAlt: 'Semen Lysytsia',
      memberRating: 4,
    },
  ];
};

export const getOrderSteps = (): IOrderStep[] => {
  return [
    {
      id: 'communication',
      step: 'Зв’яжіться з нами',
      iconName: IconName.Overview1,
    },
    {
      id: 'application process',
      step: 'Оформіть заявку',
      iconName: IconName.Overview2,
    },
    {
      id: 'prepayment',
      step: 'Після внесення 50% передоплати виконавець приступає до виконання завдання',
      iconName: IconName.Overview3,
    },
    {
      id: 'deal closing',
      step: 'По готовності сплачуєте решту суми і отримуєте готову роботу',
      iconName: IconName.Overview4,
    },
    {
      id: 'feedback',
      step: 'Залишаєте відгук',
      iconName: IconName.Overview5,
    },
  ];
};

export const getServices = (): IServiceItem[] => {
  return [
    {
      imageSrc: '/images/services-1.webp',
      imageAlt: 'Three notebooks',
      serviceTitle: WorkType.Diplomas,
      gridPosition:
        'md:max-lg:col-start-1 md:max-lg:col-end-3 md:max-lg:row-start-1 md:max-lg:row-end-3',
    },
    {
      imageSrc: '/images/services-2.webp',
      imageAlt: 'Three notebooks, a pen and glasses',
      serviceTitle: WorkType.TeamPapers,
      gridPosition: '',
    },
    {
      imageSrc: '/images/services-3.webp',
      imageAlt: 'Open book and notebook',
      serviceTitle: WorkType.BachelorTheses,
      gridPosition: 'md:max-lg:col-start-3 md:max-lg:col-end-5 md:max-lg:row-start-1',
    },
    {
      imageSrc: '/images/services-4.webp',
      imageAlt: 'A person draws diagrams',
      serviceTitle: WorkType.TestPapers,
      gridPosition:
        'md:max-lg:col-start-4 md:max-lg:col-end-5 md:max-lg:row-start-2 md:max-lg:row-end-4',
    },
    {
      imageSrc: '/images/services-5.webp',
      imageAlt: 'A person moves a pen across the text of a book',
      serviceTitle: WorkType.Abstracts,
      gridPosition: 'md:max-lg:col-start-1 md:max-lg:row-start-3 md:max-lg:row-end-5',
    },
    {
      imageSrc: '/images/services-6.webp',
      imageAlt: 'Geometric ruler, red marker and calculations',
      serviceTitle: WorkType.PracticalWorks,
      gridPosition: 'md:max-lg:col-start-2 md:max-lg:col-end-4 md:max-lg:row-start-3',
    },
    {
      imageSrc: '/images/services-7.webp',
      imageAlt: 'A pile of books',
      serviceTitle: WorkType.Presentations,
      gridPosition: '',
    },
    {
      imageSrc: '/images/services-8.webp',
      imageAlt: 'Glasses on the book',
      serviceTitle: WorkType.CaseStudyReports,
      gridPosition: 'md:max-lg:col-start-3 md:max-lg:col-end-5 md:max-lg:row-start-4',
    },
  ];
};

export const getAboutUsData = (): IAboutUs[] => {
  return [
    {
      id: 1,
      header: 'Хто ми?',
      description:
        'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
      imageData: {
        src: '/images/partnership-who-we-are.webp',
        alt: 'a couple arm pointing on a laptop',
      },
    },
    {
      id: 2,
      header: 'Кого ми шукаємо?',
      description:
        'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
      imageData: {
        src: '/images/partnership-what-we-are-looking-for.webp',
        alt: 'people sitting at the desktop',
      },
    },
  ];
};

export const getPartnershipBenefits = (): IPartnershipBenefits[] => {
  return [
    {
      id: 1,
      title: 'Конкурентна винагорода',
      desc: 'Ми пропонуємо справедливу оплату за виконану роботу',
      iconId: IconName.BenefitPartnership1,
    },
    {
      id: 2,
      title: 'Гнучкий графік',
      desc: 'Обирайте час роботи, який буде для вас найзручнішим',
      iconId: IconName.BenefitPartnership2,
    },
    {
      id: 3,
      title: 'Ваш розвиток',
      desc: 'Розвивайтеся та вдосконалюйте навички з проектами',
      iconId: IconName.BenefitPartnership3,
    },
  ];
};

export const getWorkflowData = (): IWorkflow[] => {
  return [
    {
      count: '1',
      header: 'Реєстрація',
      desc: 'Приєднуйтесь до нашої платформи через Telegram, заповнивши профіль з вашим досвідом та спеціалізацією',
      gridMarkup: 'lg:row-start-1 lg:row-end-3',
    },
    {
      count: '2',
      header: 'Отримання завдань',
      desc: "Якщо замовлення відповідає вашій експертизі, наш менеджер зв'яжеться з вами для узгодження деталей",
      gridMarkup: 'lg:row-start-2 lg:row-end-4 lg:col-start-2',
    },
    {
      count: '3',
      header: 'Виконання замовлення',
      desc: 'Після прийняття замовлення, виконуйте його з відповідальністю та уважності до деталей',
      gridMarkup: 'lg:row-start-3 lg:row-end-5',
    },
    {
      count: '4',
      header: 'Отримання оплати',
      desc: 'Після успішного виконання замовлення, оплата буде здійснена відповідно до обговорених умов',
      gridMarkup: 'lg:row-start-4 lg:row-end-6 lg:col-start-2',
    },
    {
      count: '5',
      header: 'Комунікація та підтримка',
      desc: 'Забезпечуйте відкриту комунікацію з клієнтами та готовність вносити зміни, за потреби',
      gridMarkup: 'lg:row-start-5 lg:row-end-7',
    },
  ];
};

export const getRequirements = (): IRequirements[] => {
  return [
    {
      id: 1,
      title: 'Якість та терміни',
      desc: 'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
    },
    {
      id: 2,
      title: 'Фаховість',
      desc: 'Ми шукаємо фахівців з високим рівнем знань та досвідом. Вища освіта або значний досвід роботи – перевага',
    },
    {
      id: 3,
      title: 'Навички співпраці',
      desc: 'Командна робота та врахування потреб клієнтів – це ключовий аспект успішної співпраці',
    },
  ];
};

export const getAccession = (): IAccession[] => {
  return [
    {
      step: '1',
      desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через офіційний Telegram-бот',
    },
    {
      step: '2',
      desc: 'Наш менеджер зв`яжеться з вами для узгодження подальших інструкцій та деталей',
    },
    {
      step: '3',
      desc: 'Станьте частиною команди виконавців та допоможіть нашим клієнтам досягти цілей разом з нами',
    },
  ];
};

export const getFAQQuestions = (): IQuestions[] => {
  return [
    {
      id: 'TeamPaper 1',
      title: QuestionTitle.Team1,
      answer: QuestionAnswer.Team1,
    },
    {
      id: 'TeamPaper 2',
      title: QuestionTitle.Team2,
      answer: QuestionAnswer.Team2,
    },
    {
      id: 'TeamPaper 3',
      title: QuestionTitle.Team3,
      answer: QuestionAnswer.Team3,
    },
    {
      id: 'TeamPaper 4',
      title: QuestionTitle.Team4,
      answer: QuestionAnswer.Team4,
    },
    {
      id: 'TeamPaper 5',
      title: QuestionTitle.Team5,
      answer: QuestionAnswer.Team5,
    },
    {
      id: 'TeamPaper 6',
      title: QuestionTitle.Team6,
      answer: QuestionAnswer.Team6,
    },
    {
      id: 'TeamPaper 7',
      title: QuestionTitle.Team7,
      answer: QuestionAnswer.Team7,
    },
    {
      id: 'TeamPaper 8',
      title: QuestionTitle.Team8,
      answer: QuestionAnswer.Team8,
    },
    {
      id: 'TeamPaper 9',
      title: QuestionTitle.Team9,
      answer: QuestionAnswer.Team9,
    },
    {
      id: 'TeamPaper 10',
      title: QuestionTitle.Team10,
      answer: QuestionAnswer.Team10,
    },
  ];
};

export const getHeroGrid = (): IHeroGrid[] => {
  return [
    {
      id: 'top-left',
      className:
        'overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20 lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: '/images/top-left-matrix-grid.webp',
      imageAlt: 'A person is typing on a laptop',
    },
    {
      id: 'top-right',
      className: 'col-start-3 rounded-t-[30px] bg-accentSecondary-darker/20 lg:rounded-t-[60px]',
    },
    {
      id: 'middle-left',
      className: 'row-start-2 rounded-ss-[50px] bg-accentSecondary/20 lg:rounded-ss-[100px]',
    },
    {
      id: 'middle-center',
      className: 'bg-whiteBase/20',
      imageSrc: '/images/center-matrix-grid.webp',
      imageAlt: 'A woman searches the bookshelves',
    },
    {
      id: 'middle-right',
      className: 'rounded-ee-[50px] bg-accentPrimary/20 lg:rounded-ee-[100px]',
    },
    {
      id: 'bottom-left',
      className: 'rounded-b-[30px] bg-whiteBase/20 lg:rounded-b-[60px]',
    },
    {
      id: 'bottom-right',
      className:
        'col-start-3 overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20  lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: '/images/right-bottom-matrix-grid.webp',
      imageAlt: 'A guy smiles with his arms crossed',
    },
  ];
};

export const getLegalInfoArticles = (): ILegalInfoArticle[] => {
  return [
    {
      id: 1,
      article: 'Загальні положення',
      paragraph: {
        one: 'Дана Політика конфіденційності визначає порядок отримання, зберігання, обробки, використання та розкриття персональних даних користувачів. Персональні дані користувача ми отримуємо від користувача при оформленні замовлення за телефонами, які вказані на сайті, через Telegram-бот, або при написанні на електронну пошту. Обов’язкова для надання послуги інформація позначена спеціальним чином. Інша інформація надається Користувачем на його розсуд.',
        two: 'Конфіденційність персональних даних – це обовʼязкова умова, яку ми дотримуємося для забезпечення безпеки та захисту інформації наших користувачів.',
        three:
          'Використання користувачем сайту означає згоду з цією Політикою конфіденційності та умовами обробки персональних даних користувача.',
        four: 'У випадку незгоди з умовами Політики, користувач повинен припинити використання сайту.',
        five: 'Ця Політика застосовується тільки до сайту your-website.com. Ми не несемо відповідальності за сайти третіх осіб, на які користувач може перейти за посиланнями, доступними на нашому сайті.',
        six: 'Адміністрація сайту не перевіряє правдивість персональних даних, що надаються Користувачем сайту.',
      },
    },
    {
      id: 2,
      article: 'Персональні дані',
      paragraph: {
        one: 'Веб-сайт не збирає і не зберігає персональні дані користувачів. Персональні дані користувачів, такі як ім’я, прізвище, контактний телефон, адреса електронної пошти тощо, отримані в Telegram, використовуються виключно для виконання замовлення і не зберігаються на веб-сайті.',
        two: 'Інша інформація може бути надана користувачем на його розсуд.',
        three: 'Веб-сайт не збирає IP-адреси користувачів.',
      },
    },
    {
      id: 3,
      article: 'Цілі збору і обробки персональних даних користувачів',
      paragraph: {
        one: 'Інформація, введена Користувачем у Telegram-боті, використовується для зв’язку з користувачем і передачі замовлення менеджеру. Дані користувачів використовуються виключно для виконання замовлення.',
        two: 'Обробка персональних даних Користувача здійснюється без обмеження терміну, будь-яким законним способом.',
      },
    },
    {
      id: 4,
      article: 'Умови передачі персональних даних третім особам',
      paragraph: {
        one: 'Ми не передаємо персональні дані Користувача третім особам крім випадків визначених законодавством України.',
        two: 'Передача інформації про користувача третім особам можлива виключно з метою виконання замовлення користувача. Зокрема, користувач погоджується з тим, що менеджер має право передавати персональні дані кур’єрським службам, організаціям поштового зв’язку, операторам зв’язку, виключно з метою виконання замовлення користувача, включаючи доставку товару.',
        three:
          'У разі втрати або розголошення персональних даних, ми інформуємо користувача про втрату або розголошення таких даних.',
        four: 'Ми приймаємо необхідні організаційні та технічні заходи для захисту інформації користувача від неправомірного або випадкового доступу, знищення, перекручення, блокування, копіювання, поширення, а також від інших неправомірних дій третіх осіб.',
      },
    },
    {
      id: 5,
      article: 'Зміна користувачем персональної інформації',
      paragraph: {
        one: 'Користувач може змінити або видалити надану ним персональну інформацію, звернувшись до нашого менеджера за допомогою контактних даних, зазначених на сайті або в Telegram-боті.',
      },
    },
    {
      id: 6,
      article: 'Зміна Політики конфіденційності',
      paragraph: {
        one: 'Ми маємо право змінити умови Політики конфіденційності. У такому випадку ми оновимо версію документа на сторінці «Політика конфіденційності». Будь ласка, періодично переглядайте ці умови, щоб бути поінформованими про те, як ми захищаємо інформацію наших користувачів.',
      },
    },
    {
      id: 7,
      article: 'Зворотний зв’язок. Питання та пропозиції',
      paragraph: {
        //TOFIX: не могу сообразить как сделать активной ссылку на почту в map
        one: 'Всі пропозиції або питання щодо цієї Політики слід повідомляти до нашої служби підтримки користувачів за електронною поштою AcademicAtlas@ukr.net',
      },
    },
  ];
};
