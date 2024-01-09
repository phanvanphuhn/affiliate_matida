import moment from 'moment';
import WebEngage from 'react-native-webengage';
var webengage = new WebEngage();

export const trackTellMeMoreClicked = () => {
  webengage.track('Tell Me More Clicked');
};

export const trackHowDidYouHear = () => {
  webengage.track('How Did You Hear About Matida');
};
export const trackLifestyleDuringPregnancy = option => {
  const eventDetails = {
    'Lifestyle During Pregnancy Option': option,
  };
  webengage.track('Lifestyle During Pregnancy', eventDetails);
};

export const trackLanguageChosen = language => {
  const eventDetails = {
    Language: language,
  };
  webengage.track('Language Chosen', eventDetails);
};

export const trackChildsBirthdate = (date, clicked) => {
  const eventDetails = {
    Date: date,
    "Clicked On Don't Know": clicked,
  };
  webengage.track("Child's Birthdate", eventDetails);
};

export const trackBirthdateEvent = (date, clicked) => {
  const eventDetails = {
    Date: date,
    "Clicked on Don't Know": clicked,
  };
  webengage.track('Birthdate', eventDetails);
};

export const trackClickedOnPregnancyTracker = (
  weekSelected,
  optionSelected,
) => {
  const optionText =
    optionSelected === 1
      ? 'mom & baby'
      : optionSelected === 2
      ? 'tips & symptoms'
      : 'unknown_option';

  const eventDetails = {
    'Clicked On Pregnancy Tracker': true,
    'Week Selected': `${parseInt(weekSelected)} week`,
    'Option Selected': optionText,
  };
  webengage.track('Clicked On Pregnancy Tracker', eventDetails);
};

export const trackAskAQuestionClicked = (postAnonymouslyClicked, userId) => {
  const eventDetails = {
    'Post Anonymously Clicked': postAnonymouslyClicked,
    'User Name': userId,
  };
  webengage.track('Ask A Question Clicked', eventDetails);
};

export const trackTestYourKnowledgeClicked = (question, answer) => {
  const eventDetails = {
    Question: question,
    'Answer Clicked': answer,
  };
  webengage.track('Test Your Knowledge Clicked', eventDetails);
};

export const trackArticleViewed = articleTitle => {
  const eventDetails = {
    'Article Title': articleTitle,
  };
  webengage.track('Article Viewed', eventDetails);
};

export const trackArticleInteraction = (
  articleTitle,
  articleSaved,
  clickedOnShare,
) => {
  const eventDetails = {
    'Article Title': articleTitle,
    'Article Saved': articleSaved,
    'Clicked On Share': clickedOnShare,
  };
  webengage.track('Article Interaction', eventDetails);
};

export const trackQuizChallengeClicked = (
  testAnswerClicked,
  questionNumber,
) => {
  const eventDetails = {
    'Test Answer Clicked': testAnswerClicked,
    'Question Number': questionNumber,
  };
  webengage.track('Quiz Challenge Clicked', eventDetails);
};

export const trackMessagesTab = (userSearched, messagesTabClicked) => {
  const eventDetails = {
    'User Searched': userSearched,
    'Messages Tab Clicked': messagesTabClicked,
  };
  webengage.track('Messages Tab', eventDetails);
};

export const trackMessageShared = (userName, userId, message) => {
  const eventDetails = {
    'User Name': userName,
    'User ID': userId,
    Message: message,
  };
  webengage.track('Message Shared', eventDetails);
};

export const trackScreenViewedEvent = screenName => {
  const eventDetails = {'Screen Name': screenName};
  webengage.track('Screen Viewed', eventDetails);
};
export const trackCommunityTab = askAQuestionClicked => {
  const eventDetails = {
    'Ask A Question Clicked': askAQuestionClicked,
  };
  webengage.track('Community Tab', eventDetails);
};

export const trackChatbotClicked = queryAsked => {
  const eventDetails = {
    'Query Asked': queryAsked,
  };
  webengage.track('Chatbot Clicked', eventDetails);
};

export const trackRecordedLivestream = title => {
  const eventDetails = {
    Title: title,
  };
  webengage.track('Recorded Livestream', eventDetails);
};

export const trackExpertWorkshop = (name, schedule) => {
  const eventDetails = {
    Name: name,
    Schedule: schedule.toString(),
  };
  webengage.track('Expert Workshop', eventDetails);
};

export const trackMomsTalk = title => {
  const eventDetails = {
    Title: title,
  };
  webengage.track("Mom's Talk", eventDetails);
};

export const trackMyPostsClicked = value => {
  var tabClicked = 'Most Recent';
  if (value == 2) {
    tabClicked = 'Most Popular';
  }
  const eventDetails = {
    'Tab Clicked': tabClicked,
  };
  webengage.track('My Posts Clicked', eventDetails);
};

export const trackChatBotClickedEvent = query => {
  const eventDetails = {'Query Asked': query};
  webengage.track('Chatbot Clicked', eventDetails);
};

export const trackUser = user => {
  if (user) {
    const {name, email, phone, phone_number, date_of_birth} = user;
    //     phone_number is for profile update condition
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length > 0) {
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        if (firstName) {
          webengage.user.setFirstName(firstName);
        }
        if (lastName) {
          webengage.user.setLastName(lastName);
        }
      }
    }

    for (const key in user) {
      if (key == 'pregnantWeek') {
        webengage.user.setAttribute(
          'baby_pregnantWeek',
          new Date(user?.pregnantWeek?.dueDate),
        );
        webengage.user.setAttribute(
          'baby_trimester',
          user?.pregnantWeek?.weekPregnant?.trimester,
        );
        webengage.user.setAttribute(
          'baby_weeks',
          user?.pregnantWeek?.weekPregnant?.weeks,
        );
        webengage.user.setAttribute(
          'baby_months',
          user?.pregnantWeek?.weekPregnant?.months,
        );
      }
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        const value = user[key];

        webengage.user.setAttribute(key, value);
      }
    }

    if (email) {
      webengage.user.setEmail(email);
    }
    if (phone) {
      webengage.user.setPhone(phone);
    }
    if (phone_number) {
      webengage.user.setPhone(phone_number);
    }

    if (date_of_birth) {
      webengage.user.setBirthDateString(date_of_birth);
    }
  }
};

export const trackCustomEvent = (eventName: string, eventDetails: any) => {
  // webengage.track(eventName, eventDetails);
};
