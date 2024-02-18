import PregnancyProgram from '../../../screens/app/PregnancyProgram';

export const en = {
  changeLang: {
    title: "Let's talk!",
    content: 'Please choose your preferred language',
    en: 'English',
    vi: 'Tiếng Việt',
    next: 'Next',
  },
  intro: {
    introTitle: 'Welcome to \nMatida',
    introContent:
      'Welcome to Matida! We are here to support your journey to becoming a new mother. Join our community to learn, connect and grow.',
  },
  login: {
    signIn: 'Sign In',
    wellcome: 'Welcome to \n Baby Nation!',
    logIn: 'Log In',
    signUp: 'Sign Up',
    contentLogin: 'Choose a login method',
    dontHaveAccount: 'Don’t Have an Account?',
    enterPhoneContent: 'Enter your phone number to continue',
    sendOTP: 'Send OTP code',
    enterOTP: 'Enter Your OTP Code',
    enterOTPcontent: 'Enter the 6-digit verification code we’ve sent to \n',
    confirm: 'Confirm',
    haventCode: 'You haven’t received the code?',
    resendCode: 'Resend code',
    continueFace: 'Facebook',
    continueZalo: 'Zalo',
    continuePhone: 'Phone Number',
  },
  signUp: {
    title: 'We are happy to \nhave you here!',
    content: '',
    haveAccount: 'Already have an account? ',
    titleSignUpStep2: 'We are happy to \nhave you here!',
    contentSignUpStep2: '',
    username: 'Community nick name',
    yourName: 'Your name',
    nickName: 'Your baby’s name or nickname',
    phoneNumber: 'Phone number',
    email: 'E-mail (Optional)',
    sendVerifiCode: 'Send verification code',
    titleSignUpStep3: 'Verify your account',
    contentSignUpStep3: 'Please enter your verification code',
    continueFace: 'Facebook',
    continueZalo: 'Zalo',
    continuePhone: 'Phone Number',
  },
  chooseDueDate: {
    title: 'When will be the\nbig day?',
    placeholderText:
      'Please pick your due date to personalise the Matida app to your pregnancy.',
    notKnowDueDate: 'I don’t know my due date',
    knowDueDate: 'I know my due date',
    save: 'Save',
    skip: 'Skip',
    submit: 'Submit',
    titleQuestion1: 'What is your date of birth',
    titleQuestion2: 'How did you hear about Matida',
    titleQuestion3: 'How would you describe your lifestyle pregnancy',
    placeHolderQuestion2: 'I.e. Friends, KOL tiktok.. ',
    option1: 'Relaxed and carefree: not stressing over minor details.',
    option2:
      'Nervous mom: Seeking support (as first-time moms or moms with health challenges)',
    option3: 'Busy working moms need work-life balance',
    placeholderOption4: 'Other - please describe:',
  },
  calculateDueDate: {
    calculateDuaDate: 'Calculate your\ndue date',
    calculateDuaDateDescription:
      'Choose from  a variety of ways to predict your due date',
    whenBabyDue: 'When is your baby due?',
    whenBabyDueDescription:
      'Use our calculator to find your due date based on the date of your last menstrual period, or IVF transfer date.',
    tellMeMore: 'Tell me more',
  },
  MonthTime: {
    month_1: 'January',
    month_2: 'February',
    month_3: 'March',
    month_4: 'April',
    month_5: 'May',
    month_6: 'June',
    month_7: 'July',
    month_8: 'August',
    month_9: 'September',
    month_10: 'October',
    month_11: 'November',
    month_12: 'December',
  },
  WeekTime: {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  },
  CalculationMethod: {
    method: 'Calculation method',
    first_day_of_last_period: 'First day of last period',
    dateOfTransfer: 'Date of transfer',
    ivf: 'IVF',
    calculate: 'Calculate',
    whatIsIVF: 'What is IVF?',
    detailIVF:
      "In vitro fertilization (IVF) is a complex series of procedures used to help with fertility or prevent genetic problems and assist with the conception of a child.\n\nDuring IVF, mature eggs are collected (retrieved) from ovaries and fertilized by sperm in a lab. Then the fertilized egg (embryo) or eggs (embryos) are transferred to a uterus. One full cycle of IVF takes about three weeks. Sometimes these steps are split into different parts and the process can take longer.\n\nIVF is the most effective form of assisted reproductive technology. The procedure can be done using a couple's own eggs and sperm. Or IVF may involve eggs, sperm or embryos from a known or anonymous donor. In some cases, a gestational carrier — someone who has an embryo implanted in the uterus — might be used.",
  },
  FirstDayLastPeriod: {
    cycle_length: 'Cycle length',
    days: '{{days}} days',
    unknown: 'Unknown',
  },
  IVFMethod: {
    IVF_day_transfer_date: 'IVF {{day}} day transfer date',
  },
  resultDueDate: {
    tellMeMore: 'Tell Me More',
  },
  profileSettings: {
    profileSettings: 'Profile Settings',
    yourName: 'Your Name',
    email: 'Email (Optional)',
    phoneNumber: 'Phone number',
    dueDate: 'Due Date',
    babyName: "Your baby's name or nickname",
    typeOfPregnancy: 'Type of pregnancy',
    typeOfPregnancyDetail: {
      one_baby: 'One Baby',
      multiple: 'Multiple',
    },
    save: 'Save',
    titleConfirm: 'Are you sure you want to change?',
    deleteAccount: 'Delete your Account',
    titleDelete: 'Are you sure you want to delete your account?',
    bodyDelete: "If you delete your account, you won't be able to log in again",
    delete: 'Delete',
    pregnancy_info: 'Pregnancy Information',
    expert_info: "Expert's information",
    expert: 'EXPERT',
    admin: 'ADMIN',
    reward: 'Rewards',
    typeUser: ['Mom', 'Expert', 'Admin'],
    noData: 'No data',
  },
  home: {
    talkAbout: 'What mothers discuss',
    mom_and_baby: 'Pregnancy Tracker',
    weeks: 'Week {{weeks}}',
    sizeComparison: {
      babySize: "Baby's size",
      embryo: 'Mom & Baby',
      mom: 'Mom',
      sympton: 'Tips & Symptoms',
      weeks: 'weeks',
    },
    pregnancy: {
      pregnant: 'You are {{weeks}} weeks & {{days}} days pregnant',
      titleProgress: '{{weeks}} weeks to go!',
    },
    weeklyArticles: 'Articles',
    weeklyVideos: 'Videos',
    podcasts: 'Podcasts',
    groupTalks: 'Upcoming group talks',
    discuss: 'What moms discuss',
    dailyAffirmation: 'Weekly affirmation',
    seeMore: 'See more',
    viewAll: 'View all',
    past_your_due_date: 'You are now past your due date',
    trimester: ['FIRST TRIMESTER', 'SECOND TRIMESTER', 'THIRD TRIMESTER'],
    dueDate: 'DUE DATE: ',
    createPost: 'Ask a question',
    askTida: 'Ask Tida AI',
    titleTida: 'Hello! I’m Tida AI\nHow can I help you?',
    yay: 'Amazing!',
    try_again: 'Oh no! Try again tomorrow',
    correct: 'answered right',
    false: 'answered wrong',
    testKnowledge: 'Test your knowledge',
    masterClass: 'Master Classes',
    titleBannerQuiz: 'Pregnancy & Baby Preparation Quiz',
    bodyBannerQuiz:
      'How prepared are you for becoming a mother? Let’s check your knowledge',
    buttonBannerQuiz: 'Take test now',
    signUpNow: 'Sign up now',
    getStarted: 'Get started',
    wantToBeTheSmartest: 'Are you ready to become a mom?',
    getAheadWithMatidaMasterclass: 'Discover with just\n9 simple questions.',
    takeTheMatidaMasterclass: 'Don’t miss your chance!',
    wellWorkYourChallenges: 'Join the class and\nhave a stress-free\n9 months',
    wantToBe: 'Want to be the smartest mom in Vietnam?',
    checkMasterclass: 'Check Masterclass',
    theCorrectAnswer: 'The correct answer is',
  },
  sizeComparison: {
    week: 'Week',
    titleHeader: 'Pregnancy tracker',
    titleProgress: 'weeks to go!',
    afterBirth: 'After Birth',
    weeks: 'Week %start - %end',
    titleQuiz: 'Daily quiz',
  },
  videoList: {
    titleHeader: 'Videos for you',
    noData: 'No data',
    minsWatch: '{{minutes}} mins watch',
  },
  timeLine: {
    titleHeader: 'Important dates of your pregnancy',
  },
  newFeed: {
    titleHeader: 'What moms talk about',
    titleHeaderMyPost: 'My Posts',
  },
  data: {
    notData: 'No Data !',
    notFind: 'No matching posts found !',
  },
  bottomTab: {
    explore: 'Explore',
    feed: 'Explore',
    liveTalks: 'Live Talks',
    home: 'Tracker',
    community: 'Community',
    deal: 'Deals',
    program: 'Masterclass',
  },
  popularArticles: 'More to read',
  seeMore: 'See more',
  articlesOfWeek: 'Weekly articles',
  explore: {
    topResults: 'Top Results',
    dailyReads: 'All you need to know',
    talkAbout: 'What moms talk about',
    search: 'Search title',
    sorry: 'Sorry!',
    // notResult:
    //   'We could not find any matches for your search. Please try again using a different keyword',
    notResult: 'We could not find any matches for your search.',

    article: 'Articles',
    titleFilterTopic: 'Choose Trimester & Topic',
    titleSort: 'Sort by',
    recent: 'Most Recent',
    popular: 'Most Popular',
    filter: 'Filter',
    cancelFilterExpert: 'Delete filter by expert',
    filterExpert: 'Filter Expert',
    searchExpert: 'Search expert',
    noDataExpert: 'No experts found',
  },
  setting: {
    profile: 'My Account',
    lang: 'Change Language',
    logOut: 'Log Out',
    cancel: 'Cancel',
    confirm: 'Confirm',
    my_post: 'My Posts',
    titleLogout: 'Are you sure you want to log out?',
    titleConfirm: 'Save your settings?',
    bodyConfirm:
      'Your profile settings have not been saved. Would you like to save it ?',
    titleModalProfile: 'Save your settings?',
    contentModalProfile:
      'Your profile settings have not been saved. \nWould you like to save it ?',
    save: 'Save it',
    discard: 'Discard',
    myPurchases: 'My Purchases',
    privacyPolicy: 'Privacy Policy',
    block: 'Blocked Users',
    version: 'Version: ',
    mom: 'Mom',
    baby: 'Babies',
    source: 'Sources of the recommendations',
  },
  articles: {
    listen: 'Listen to the article',
    trimester: 'Trimester',
    mood: 'Mood',
    topic: 'Topic',
    nauseous: 'Nauseous',
    nervous: 'Nervous',
    happy: 'Happy',
    curious: 'Curious',
    pregnancy: 'Pregnancy Development',
    medical: 'Medical',
    mentalHealth: 'Mental Health',
    fitnessWellness: 'Fitness & Wellness',
    nutrition: 'Nutrition',
    lifeCareer: 'Life & Career',
    labour: 'Labour',
    babyCare: 'Baby Care',
    filter: {
      filter: 'Filter',
      clearAll: 'Clear all',
      apply: 'Apply Filter',
    },
    moreArticles: 'More articles',
    saveArticles: 'Saved articles',
    buttonSave: 'Save this article',
    share: 'Share',
    titleShare: 'Share this article',
    copyLink: 'Copy link',
    shareSocial: 'Share via social network',
    shareUser: 'Share with a Matida user',
    inputShareUser: 'Search user...',
    more: '+{{index}} more',
    errorShare: 'Error doing link copy',
    successShare: 'Copy path success',
    shareUserSuccess: 'Sharing the success',
  },
  post: {
    create_new: 'Ask a question',
    post: 'Post',
    placeHolderPost:
      'Just ask your question here. We are a community of moms and here to support you.',
    title: 'Title',
    content: 'Content',
    message_success_post: 'Post successfully posted',
    message_success_post_edit: 'Post edit successfully',
    message_success_post_delete: 'Post deleted successfully',
    title_modal_delete: 'Are you sure you want to delete this post?',
    my_post: 'My Posts',
    titleReply: 'Replying to',
    write_a_comment: 'Write a comment...',
    createBy: 'Create by ',
    all_posts: 'All Posts',
    most_recent: 'Most Recent',
    most_popular: 'Most Popular',
    edit: 'Edit',
    edit_post: 'Edit a question',
    settings: {
      postSettings: 'Post settings',
      report: 'Report this post',
      block: 'Block this user',
    },
    report: 'Report',
    inappropriate: 'Report inappropriate content',
    sexual: 'Report sexual content',
    discriminatory: 'Report discriminatory ethnic content',
    others: 'Others',
    typeAny: 'Type anything',
    choose_reason: 'Choose Reason',
    what_issue: 'What’s the issue?',
    titleIssue: 'What’s the issue?',
    chooseReason: 'Choose Reason',
    notData: 'The post does not exist or has been deleted by the user',
    anonymous: 'Post anonymously in forum',
    ano: 'Anonymous',
    me: 'Me',
    postedInAnonymus: 'Posted in Anonymous',
    whoOnline: 'other moms are online. Click to start chatting',
  },
  podcast: {
    headerList: 'Podcasts',
    trimester: 'Trimester {{index}}',
    like: ' likes',
    time: '{{time}} min',
    by: 'by ',
    descriptions: 'Podcast descriptions',
    speaker: 'About speaker',
  },
  liveTalks: {
    launching_soon: 'Launching Soon',
    lauching_soon_content:
      'Stay tuned! Our live talk and discussion \nfeature is coming soon!',
    d: 'DAY',
    h: 'HOUR',
    m: 'MINUTE',
  },
  views: {
    views: '{{views}} views',
  },
  block_user: {
    titleHeader: 'List of blocked users',
    unBlock: 'Unblock',
    titleButtonBlock: 'Block user',
    block: 'Block',
    titleModalBlock:
      'They won’t be able to see your profile or posts on Matida. Matida won’t let them know you blocked them.',
    setting: 'Setting',
    titleModalUnBlock: 'Are you sure you want to unblock?',
    noData: 'No users are blocked',
    cancle: 'Discard',
  },
  notification: {
    all: 'All',
    unread: 'Unread',
    replyComment: ' replies your comment ',
    createNew: 'creates a new',
    liked: 'liked your comment',
  },
  chat: {
    send_message: 'Send Message',
    title_setting: 'Conversation settings',
    message_noti: 'Message notification',
    search: 'Search user',
    hour: 'h',
    minutes: 'm',
    justDone: 'Just done',
    type_chat: 'Type a message...',
    title: 'Messages',
    you: 'You:',
    messageNotText: 'Sent a message',
    questionTida: 'Select question to ask Tida AI',
    cancel: 'Cancel',
  },
  talk: {
    momTalk: 'Mom’s Talks',
    expertWorkshops: 'Expert Workshops',
    recordedExpert: 'Recorded Livestream',
    seeAll: 'See all',
    titleCreate: 'Create room',
    public: 'Public',
    private: 'Private',
    roomType: 'Room type',
    roomName: 'Room name',
    roomDes: 'Room description (minimum 50 characters)',
    selectTime: 'Select start time',
    schedule: 'Schedule',
    participants: 'Participants',
    inviteParticipants: 'Invite participants',
    searchUser: 'Search participants',
    cancel: 'Cancel',
    usersSelected: '{{index}} users invited',
    select: 'Select',
    invite: 'Invite',
    titleEdit: 'Edit Room',
    saveRoom: 'Save Room',
    expertTalkType: 'Expert Talk',
    momTalkType: "Mom's Talk",
    live: 'Live',
    host: 'Host: ',
    myRoom: 'You are hosting this room',
    membersWatching: '{{index}} people in the room',
    timeEnded: 'Room will end in {{time}} minutes',
    timeStart: 'Room will start in {{time}} minutes',
    buttonEdit: 'Edit',
    mode: 'Select mode',
    community: 'Community',
    expert: 'Expert',
    workshop: 'EXPERT WORKSHOP',
    liveRoom: 'Live room',
    placeholderSearch: 'Search record',
  },
  allRoomMetting: {
    all: 'All rooms',
    my_room: 'My rooms',
    save_room: 'Saved rooms',
    no_data: 'No data',
    live: 'Live',
    end: 'End',
    hosted: 'Hosted by you',
    joined: 'Joined Room',
    reminderTime: 'Enable reminder',
    content_reminderTime: 'Matida will remind you 10 minutes in advance',
    host: 'Host',
    public: 'PUBLIC',
    private: 'PRIVATE',
    request_join: 'Request Join Room',
    join_room: 'Join Room',
    accept_join_room: 'Accept',
    cancle_accept_join_room: 'No, thanks',
    pending: 'PENDING',
    accept: 'ACCEPT',
    reject: 'REJECT',
    raise_hand_alert: 'just raised my hand to speak',
    you_raise_hand_alert: 'You just raised my hand to speak',
    kick_alert: 'You have just been invited out of the chat by the host',
    raise_hand: 'Raise Hand',
    leave: 'Leave',
    title_modal_rise_hand: 'Got something to say?',
    content_modal_rise_hand:
      'Raise your hand to speak. If the host approves, you’ll immediately join the stage',
    button_raise_hand: 'Raise Hand',
    neverMind: 'Nevermind',
    remove: 'Remove',
    title_modal_review: 'You left the talk',
    content_modal_review: 'Please rate your experience',
    bad: 'Very bad',
    good: 'Very good',
    your_comment: 'Your comment',
    evaluate: 'Evaluate',
    rejoin: 'Rejoin',
    tks_review: 'Thank you for rating',
    view_more: 'View More',
    compact: 'Compact',
    coming_end: 'The chat room will end in 5 minutes',
    end_room: 'The chat room has ended',
    ticketPrice: 'Ticket price:',
    inviteAll: 'Invite all everyone',
    open_message: 'Check your inbox for the invitation',
  },
  liveStream: {
    startLiveStreamingButton: 'Start live',
    noHostOnline: 'No host online',
    memberListTitle: 'List member',
    titleStart: 'Are you sure you want to record this meeting?',
    titleEnd: 'Are you sure you want to stop recording?',
    yes: 'Yes',
    no: 'No',
    noti: 'Notification',
  },
  chatGPT: {
    note: 'Note: ',
    contentNote:
      'Tida AI is an artificial intelligence product. Information is for reference purposes only. Please contact your doctor for medical information.',
    titleModalSuggest: 'Select question to ask AI',
    postForum: 'Post in forum',
  },
  modalEndCall: {
    title: 'Closing Confirmation',
    content1: 'Closed rooms will not be reopened, click',
    content2: 'to continue, or',
    content3: 'to return to the old screen.',
    buttonConfirm: 'Close Room',
    buttonCancle: 'Cancel',
  },
  test: {
    momPrepTest: 'Matida Pregnancy Preparation',
    periodicTests: 'All tests',
    notStarted: 'Not started',
    completedTest: '{{index}}% Completed',
    yourTestHistory: 'Your accomplishments',
    completedNameTest: 'Completed {{name}}',
    reward: 'Badges',
    yaySuper: 'Amazing!',
    testComplete: 'Test Complete!',
    yourResult: 'Your result',
    seeAllAnswer: 'See all answers',
    question: 'Question {{index}}',
    answer: 'Answer: ',
    listAnswer: 'Answer list',
    redoTest: 'Do the test again',
    maybeLater: 'Maybe later',
    prevQuestion: 'Prev question',
    next: 'Next',
    submit: 'Submit',
    congratulation: 'Congratulations!',
    rewardCompleting: 'Here is your reward for completing ',
    viewAllAnswer: 'View all answers',
    continueMatida: 'Continue to Matida',
    getReward: 'Get reward',
    titleConfirm: 'Are you sure you want to exit?',
    bodyConfirm: 'The answers will not be saved when you exit',
    cancel: 'Cancel',
    exit: 'Exit',
    tryMoreTest: 'Try another test',
    noData: "You haven't taken any tests yet",
    seeMore: 'See more',
    doOtherTest: 'Try another test',
    noDataQuiz: 'There are no tests',
  },
  payment: {
    pay: '{{money}} {{currency}}',
    purchase: 'Purchase',
    premiumContent: 'Premium Content: ',
    premium: 'Premium: Please purchase to access this exclusive content',
    unlock: 'Would you like to unlock{{cart}} for {{price}} {{currency}}?',
    video: ' this video',
    podcast: ' this podcast',
    article: ' this article',
    course: ' the complete master class',
    notSupport: 'Your device does not support this payment method',
    error: 'Error',
    cancel: 'Cancel',
    yes: 'Yes',
    success: 'Success',
    msgSuccess: 'You have successfully purchased!',
    failure: 'Failure',
    msgFailure: 'Payment failed. Please try again.',
    other: 'Other Payment',
    method: 'Method Payment',
    tooltip:
      'Products include hard copy documents, related practice tools...\nProducts will be sent to you 2 to 3 days after successful payment. Please pay attention to the message on Matida, we will contact you soon.\nDelivery time may be delayed due to the large number of orders, please wait.',
  },
  masterClass: {
    like: '{{like}} like',
    likes: '{{like}} likes',
    video: 'video',
    course: 'course',
    description: 'Description',
    exclusiveContent: 'Exclusive Content',
  },
  feedback: {
    help: {
      title: 'What do you hope Matida will help you with?',
      textBody: 'Please answer as detailed as possible',
      placeholder: 'Typing your answer here',
    },
    topic: {
      title: 'What topics around pregnancy interest you most?',
      placeholder: 'Others',
      topic: [
        'Medical knowledge',
        'Nutrition',
        'Finances',
        'Making money',
        'Shopping & hot deals',
        'Relationship',
      ],
    },
    next: 'Next',
  },
  slideIntro: {
    title: [
      'Welcome!',
      'Baby tracker',
      'Read and learn',
      'Live talks',
      'Daily quizzes',
      'Tida AI',
      "Let's connect!",
    ],
    textBody: [
      'Matida is here to support you in every single milestone from Pregnancy to Newborn.',
      'Follow your baby’s growth in every single milestone.',
      'Enrich your knowledge with thousands of articles, videos and more',
      'Join weekly live talks from doctors and experts.',
      'Smart Mom? Test your knowledge!',
      'Got questions? Ask Tida and get answers in seconds.',
      'Join our community with more than 50,000 moms and experts. Always remember, you are not alone.',
    ],
    skip: 'Skip',
    dashboard: 'Start exploring',
  },
  feed: {
    search: 'search',
    seeMore: 'See more',
    seeLess: 'See less',
    by: 'by',
    min: 'mins watch',
    views: 'views',
    like: 'Like',
    comment: 'Comment',
    noComment: 'No comments',
    todayQuestion: 'Matida Pregnancy Preparation',
    enterTest: 'Next',
    completed: 'completed',
    momPrepTest: 'Test your knowledge',
    article: 'Article',
    dailyQuiz: 'Daily quiz',
  },
  appUpdate: {
    welcome: 'Welcome',
    desc: 'Please update the app to continue',
    update: 'Update',
  },
  error: {
    uploadImageFail: 'Please select a smaller size image',
    addNewBornFail: 'Add new born fail',
    pleaseTryAgain: 'Please try again.',
    success: 'Success!',
    pleaseEnterName: 'Please enter your name',
    pleaseEnterValidName: 'Special characters are not allowed in the name',
    pleaseEnterPhone: 'Please enter your phone number',
    pleaseEnterValidPhone: 'Please enter validate phone number',
    pleaseEnterPregnancyWeek: 'Please enter your pregnancy week',
    pleaseEnterValidPregnancyWeek:
      'Please enter a valid integer for pregnancy week',
    pregnancyWeekCannot: 'Pregnancy week cannot be higher than 40',
    pregnancyWeekCannotLower: 'Pregnancy week cannot be lower than 1',
  },
  deal: {
    by: 'by',
    getDeal: 'Get Deal',
    copyCode: 'Copy code & go to website',
    cancel: 'Cancel',
    dealCode: 'Deal code',
    name: 'Name',
    address: 'Address',
    email: 'Email',
    phoneNumber: 'Phone Number',
    getOffer: 'Get deal',
    submit: 'Submit',
    contactForm: 'Get deal',
    getCodeSuccess: 'Get code success',
    getCodeFailed: 'Get code failed',
    submitSuccess: 'Submit deal success',
    submitFailed: 'Submit deal failed',
  },
  newBorn: {
    hi: 'Hi Mom,',
    hasBaby: 'Has your baby been born yet?',
    yes: 'Yes',
    no: 'No',
    tidaDesc:
      'Tida will be your personal assistant. Feel free to reach me out anytime if you have any question.',
    finish: 'Finish',
    congratulation: 'Congratulations!',
    whichDate: 'On which date was your baby born?',
    whatTime: 'What time was your baby born?',
    whatName: "What is your baby's name?",
    whatGender: "What is your baby's gender?",
    howDeliver: 'How did you deliver?',
    whatWeight: "What was your baby's weight?",
    whatHeight: "What was your baby's height?",
    havePicture: 'Have you got any picture of the baby?',
    welcome: 'Welcome to',
    journey: 'the Newborn journey!',
    done: 'So excited!',
    babyName: "Baby's name",
    name: 'Name',
    babyWeight: 'Birth weight',
    babyHeight: 'Birth height',
    male: 'Boy',
    female: 'Girl',
    notToSay: 'Prefer not to say',
    naturalBirth: 'Natural Birth',
    cSection: 'C section',
    dob: 'Date of birth',
    tob: 'Time of birth',
    gender: 'Gender',
    birthExperience: 'Birth experience',
    save: 'Save',
    cancel: 'Cancel',
    addBaby: 'Add baby',
    happyParenting: 'Happy parenting!',
    tellMeMore: 'Tell me more about your little one',
    babyPicture: "Baby's pictures",
    selectDate: 'Select date',
    selectTime: 'Select time',
    happyPreggy: 'Happy Preggy!',
    dueDate: 'Due date',
    addDueDate: 'Add due date',
    bornOn: 'born on',
    year: 'year',
    month: 'month',
    week: 'week',
    day: 'day',
    old: 'old',
    tracker: 'Newborn Tracker',
    highlights: 'Highlights',
    viewMore: 'View more',
    update: 'This content will be added shortly. Stay tuned!',
    plsAddDueDate: 'Please add the due date of your baby.',
    calculateDueDate: 'Use our calculator to find out your due date.',
  },
  newBornTida: {
    hi: "Hi mommy,\nit's normal to have tons of questions.",
    tidaHere: 'Tida is here for you!',
    askNow: 'Ask Tida now',
    reportBirth: 'Report birth',
  },
  newBornErrorMsg: {
    requireName: 'Please input name of baby',
    specialName: 'Name cannot contains special characters',
    requireDob: 'Please input date of birth of baby',
    requireTob: 'Please input time of birth of baby',
    requireWeight: 'Please input weight of baby',
    requireHeight: 'Please input height of baby',
    requireDueDate: 'Please input due date of baby',
  },
  momProgram: {
    youAreInvite: 'You’re invited to join',
    powerMom: 'The Power Mom Program',
    signUpHere: 'Sign up here for early, ',
    free: 'free of charge',
    access: 'access.',
    sub1: '• Expert guidance through your pregnancy',
    sub2: '• Access to a medical doctor for questions',
    sub3: '• Reduce stress or anxiety',
    sub4: '• Vouchers, offers & bonus surprises',
    accept: 'Accept invitation',
    freeOfCharge: 'Free of charge, no strings attached',
    thankYou:
      'Thank you for signing up for the program.\nWe will let you know when you can join it!',
  },
  addInformation: {
    helpCalculate: 'I need your help to calculate',
    babySize: 'Baby’s size is now',
    mystery: 'a mystery',
    addInformation: 'Add information',
  },
  common: {
    networkSystem: 'Network System',
    noInternet:
      'There is no internet connection\nPlease check your internet connection',
    tryAgain: 'Try Again',
    done: 'Done',
    savedFileSuccess: 'Saved file success!',
    copySuccessfully: 'Copy successfully',
    nailedIt: 'Nailed it',
    paymentFailed: 'Payment failed!',
    paymentSuccess: 'Payment success!',
    buyNow: 'Click to pay',
    readMore: 'Read more',
  },
  pregnancyProgram: {
    masterClassResult: 'We have identified your challenges.',
    dontWorry: "But don't worry, our experts\ncan help you improve",
    here: "Here’s what we'll focus on",
    adjust: 'You can always adjust it later',
    letWork: 'Learn how to improve',
    aioCourse: 'Your Pregnancy Companion',
    yourResults: 'Your results',
    newbie: 'Newbie',
    expert: 'Expert',
    attention: 'Attention 🔥',
    importantAttention:
      'You might be missing important information related to your baby and/or your body when navigating pregnancy.',
    haveQuestion: 'Have questions about this course?',
    checkThisOut: 'Check this out',
    liftTime: 'lifetime',
    signUpEarly: 'Sign up for early bird discount',
    directAccess: 'Direct access to doctors & experts',
    weeklyEffort: 'Weekly effort of 15 minutes',
    supportBaby: "Support your baby's growth",
    beTheBest: 'Be the best version of yourself',
    getDiscount: 'Get discounts & save',
    aboutTheProgram: 'About the program',
    supportGroup:
      'A support group with medical doctors\n& like-minded moms (to be)',
    learnAll: "Learn all the pregnancy secrets\n that other moms don't know",
    techniqueHabit: 'Techniques & habits to\nbest develop your unborn child',
    personalGuidance:
      'Personal guidance to understand\nyour strengths & weaknesses',
    voucherFor: 'Vouchers for family related\n shops and services',
    babyExpert: 'Baby Expert',
    obstetrician: 'Obstetrician',
    lactation: 'Lactation Expert',
    financial: 'Financial Coach',
    yoga: 'Yoga Coach',
    pm: 'Program Manager',
    yourInformation: 'Your information',
    pleaseFill: 'Please fill in this form so we can set up your plan.',
    yourName: 'Your name',
    phoneNumber: 'Your phone number',
    yourPregnancyWeek: 'Your pregnancy week',
    next: 'Next',
    byContinue: 'By continue, I agree to the',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    completePayment: 'Complete payment',
    selectMethod: 'Please select a method to complete this payment',
    bankTransfer: 'Bank Transfer',
    transactionContent: 'Transaction contents',
    transactionAmount: 'Transaction amount',
    bankAccount: 'Bank account',
    bank: 'Bank',
    accountOwner: 'Account owner',
    transferredMoney: 'I have transferred my money',
    Upcoming: 'Upcoming',
    Completed: 'Completed',
    Happening: 'Happening',
    uncompleted: 'Uncompleted',
    youAreNow: 'You are now in week',
    weekToGo: 'weeks to go. You got this!',
    thankMommy: "Thanks Mommy, I'm proud of you !",
    finishTheTask: 'Finish the task',
    reviewIt: 'Review it',
    pregnancyKnowledge: 'Pregnancy Knowledge',
    pregnancyBasics: 'Pregnancy Basics',
    loveMoney: 'Love & Money',
    fitnessNutrition: 'Fitness & Nutrition',
    personalChallenge: 'Personal challenge',
    core: 'Core',
    babyCare: 'Baby Care',
    makingProgress: 'You are making progress',
    programCreated: 'Your program is being created!',
    dontForget: "Don't forget to",
    turnOnNoti: 'turn on your notifications',
    reminder: 'for weekly important reminders.',
    thankYouForSignUp:
      'Thank your for signing up! \nOur team will now create your personalized program and activate it for you. You will hear from us in the next 24 hours.',
    exploreMatida: 'Explore Matida',
    learn: 'Learn',
    quiz: 'Quiz',
    checkup: 'Check up',
    activity: 'Activity',
    meal_plan: 'Meal plan',
    LetWrapUpThisWeekTogether: "Let's wrap up this week together",
    LetUsKnowHowThisWeekHasHelpedYou:
      'Let us know how this week has helped you.',
    DoYouEnjoyTheProgramSoFar: 'Do you enjoy the program so far?',
    TellUsAnything: 'Tell us anything...',
    PleaseRateThisWeekContent: "Please rate this week's content",
    ThankYouForYourFeedback: 'Thank you for your feedback!',
    YourFeedbackHelpsUsToGetBetter: 'Your feedback helps us to get better.',
    AboutTheProgram: 'About the program',
    MeetOurExperts: 'Meet our experts',
    FrequentlyAskedQuestions: 'Frequently asked questions',
    aHolisticProgram:
      'A holistic program designed for the maternal health journey',
    contentAboutTheProgram:
      "Matida Masterclass revolutionizes prenatal care by blending convenience, personalization, and expert advice in a comprehensive app. Tailored for moms-to-be, it ensures thorough preparation for motherhood while addressing women's unique needs and challenges.  \n\nThis holistic program contains four key modules: pregnancy fundamentals, baby care, fitness & nutrition, and love & money. With a minimal weekly investment of just 15 minutes, you gain essential knowledge for a healthy pregnancy, a happy motherhood journey, and a balanced family life.",
    AnEntireCareTeamAtYourFingertips: 'An entire care team at your fingertips',
    contentExperts:
      'The Matida pregnancy program was crafted by our expert medical team, offering the most valuable and supportive content for your journey.',
    ThereAreNoStupidQuestions: 'There are no stupid questions :-)',
    HowDoesTheProgramWork: 'How does the program work?',
    contentHowDoesTheProgramWork:
      'The Matida pregnancy program provides a structured yet flexible set of modules including learning content and tasks, which you can access anytime through our app. These modules cover a wide range of topics, from prenatal care to preparing for motherhood, and are designed to be easily integrated into your daily routine.',
    WhatFeaturesAreIncluded: 'What features are included?',
    contentWhatFeaturesAreIncluded:
      'The program includes a variety of features such as personalized content tailored to your pregnancy stage, expert advice, interactive checklists, fitness and nutrition guides, and access to a supportive community of fellow moms-to-be.',
    WhereDidMatidaSourceItsContent: 'Where did Matida source its content?',
    contentWhereDidMatidaSourceItsContent:
      "Matida's content is meticulously curated and created by a team of medical professionals, experienced mothers, and subject matter experts. We ensure all information is evidence-based, up-to-date, and aligned with the latest medical guidelines and practices.",
    HowOftenIsTheProgramContentUpdated:
      'How often is the program content updated?',
    contentHowOftenIsTheProgramContentUpdated:
      'Our content is regularly reviewed and updated by medical professionals to ensure it remains current, relevant, and in line with the latest in prenatal and postnatal care.',
    WhoIsTheMatidaPregnancyProgramDesignedFor:
      'Who is the Matida pregnancy program designed for?',
    contentWhoIsTheMatidaPregnancyProgramDesignedFor:
      "The Matida pregnancy program is tailored for expectant mothers at any stage of pregnancy, seeking comprehensive guidance and support. It's ideal for those looking for a blend of medical expertise, practical advice, and emotional support.",
    HowLongDoesTheProgramLast: 'How long does the program last?',
    contentHowLongDoesTheProgramLast:
      "The program spans the entirety of your pregnancy journey, offering tailored content from early pregnancy through to birth preparation. It's designed to be flexible, allowing you to access information and support as needed.",
    CanIJoinTheProgramAtAAnyStageOfMyPregnancy:
      'Can I join the program at any stage of my pregnancy?',
    contentCanIJoinTheProgramAtAAnyStageOfMyPregnancy:
      'Absolutely! Our program is designed to be beneficial whether you join in the early weeks, mid-pregnancy, or closer to your due date, providing relevant information at each stage.',
    IsTheProgramSuitable:
      'Is the program suitable for those with specific health conditions or high-risk pregnancies?',
    contentIsTheProgramSuitable:
      'The program offers general pregnancy guidance and should complement, not replace, personalized medical advice. We recommend consulting with your healthcare provider to ensure the program aligns with your specific health needs.',
    HowIsTheMatidaProgram:
      'How is the Matida program different from other pregnancy apps or programs?',
    contentHowIsTheMatidaProgram:
      "Matida's program stands out for its holistic approach, combining medical expertise, practical parenting tips, and emotional well-being resources, all tailored to your pregnancy journey.",
    AreThereAnyLiveSessions:
      'Are there any live sessions or direct consultations available as part of the program?',
    contentAreThereAnyLiveSessions:
      'While the core of our program is digital content, we also offer live sessions with experts for deeper engagement and personalized advice. These sessions are weekly live streams on the app or exchanges in private Zalo groups.',
    CanFamilyMembersOrPartnersParticipateInTheProgram:
      'Can family members or partners participate in the program?',
    contentCanFamilyMembersOrPartnersParticipateInTheProgram:
      'This specific program is specifically designed for mothers to be. However, there are parts of the program that foster the involvement of family in order to enhance the pregnancy experience and prepare them for their supportive roles.',
    IHaveMoreQuestions: 'I have more questions - How can I get in touch?',
    contentIHaveMoreQuestions:
      'Please write us an email to contact@matida.app.',
    comeBackLater: 'Come back later',
    AreYouReadyToBeTheBestMom: 'Are you ready\nto be the best mom?',
    LearnAboutTheBabyDevelopmentMilestones:
      'Haptonomy and Nutritional Strategies for a Brilliant Baby',
    SignUpNowToUnlock: 'Analyze your knowledge',
    contentForWeekComeBackLater:
      'These contents are for week {{week}}. Come back later!',
    exploreAndLearn: 'Explore and learn',
    takeTheQuiz: 'Take the quiz',
  },
  momDiary: {
    momDiary: 'Mom Diary',
    edit: 'Edit',
    save: 'Save',
    momDesc:
      'Make sure to fill out this diary every week. At the end of your pregnancy, Matida has a present for you.',
    week: 'Week',
    uploadPicture: 'Upload a picture of your bump this week',
    messageBaby: 'message to your baby',
    writeSomething: 'Write something about this ',
    errorMsg: 'Images and note are required',
  },
  myPurchases: {
    noPurchaseFound: 'No purchase found',
    noPurchaseHistory: 'You have no purchase history, Mom!',
    signUpNow: 'Sign up now',
    lifetime: 'lifetime',
    billing:
      'Membership might take up to 24 hours after the billing date to be fully activated.',
    purchaseHistory: 'Purchase History',
    Amount: 'Amount',
    Method: 'Method',
    bankTransfer: 'Bank Transfer',
    Date: 'Date',
    Successful: 'Successful',
    Pending: 'Pending',
    Failed: 'Failed',
    onlyAvailable:
      'This content is only available for users of\nMatida Masterclass. Sign up now to view it.',
  },
  forum: {
    upcoming: 'Upcoming',
  },
};
