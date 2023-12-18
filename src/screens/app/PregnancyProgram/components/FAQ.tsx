import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {colors, scaler} from '@stylesCommon';
import Collapsible from './Collapsible';

interface FAQProps {}
const data = [
  {
    title: 'How does the program work?',
    content:
      'The Matida pregnancy program provides a structured yet flexible set of modules including learning content and tasks, which you can access anytime through our app. These modules cover a wide range of topics, from prenatal care to preparing for motherhood, and are designed to be easily integrated into your daily routine.',
  },
  {
    title: 'What features are included?',
    content:
      'The program includes a variety of features such as personalized content tailored to your pregnancy stage, expert advice, interactive checklists, fitness and nutrition guides, and access to a supportive community of fellow moms-to-be.',
  },
  {
    title: 'Where did Matida source its content?',
    content:
      "Matida's content is meticulously curated and created by a team of medical professionals, experienced mothers, and subject matter experts. We ensure all information is evidence-based, up-to-date, and aligned with the latest medical guidelines and practices.",
  },
  {
    title: 'How often is the program content updated?',
    content:
      'Our content is regularly reviewed and updated by medical professionals to ensure it remains current, relevant, and in line with the latest in prenatal and postnatal care.',
  },
  {
    title: 'Who is the Matida pregnancy program designed for?',
    content:
      "The Matida pregnancy program is tailored for expectant mothers at any stage of pregnancy, seeking comprehensive guidance and support. It's ideal for those looking for a blend of medical expertise, practical advice, and emotional support.",
  },
  {
    title: 'How long does the program last?',
    content:
      "The program spans the entirety of your pregnancy journey, offering tailored content from early pregnancy through to birth preparation. It's designed to be flexible, allowing you to access information and support as needed.",
  },
  {
    title: 'Can I join the program at any stage of my pregnancy?',
    content:
      'Absolutely! Our program is designed to be beneficial whether you join in the early weeks, mid-pregnancy, or closer to your due date, providing relevant information at each stage.',
  },
  {
    title:
      'Is the program suitable for those with specific health conditions or high-risk pregnancies?',
    content:
      'The program offers general pregnancy guidance and should complement, not replace, personalized medical advice. We recommend consulting with your healthcare provider to ensure the program aligns with your specific health needs.',
  },
  {
    title:
      'How is the Matida program different from other pregnancy apps or programs?',
    content:
      "Matida's program stands out for its holistic approach, combining medical expertise, practical parenting tips, and emotional well-being resources, all tailored to your pregnancy journey.",
  },
  {
    title:
      'Are there any live sessions or direct consultations available as part of the program?',
    content:
      'While the core of our program is digital content, we also offer live sessions with experts for deeper engagement and personalized advice. These sessions are weekly live streams on the app or exchanges in private Zalo groups.',
  },
  {
    title: 'Can family members or partners participate in the program?',
    content:
      'This specific program is specifically designed for mothers to be. However, there are parts of the program that foster the involvement of family in order to enhance the pregnancy experience and prepare them for their supportive roles.',
  },
  {
    title: 'What is your refund policy?',
    content:
      "We offer a satisfaction-guaranteed refund policy. If you're not completely satisfied with the program within the first 30 days of your subscription, please get in touch.",
  },
  {
    title: 'I have more questions - How can I get in touch?',
    content: 'Please write us an email to contact@matida.app.',
  },
];
const colorList = [colors.pink350, colors.yellow200, colors.blue];
const FAQ = (props: FAQProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: scaler(17),
            fontWeight: '500',
          }}>
          Frequently asked questions
        </Text>
        <Text
          style={{
            fontSize: scaler(22),
            fontWeight: '600',
            lineHeight: 28,
            marginTop: 6,
            marginBottom: 20,
          }}>
          There are no stupid questions :-)
        </Text>

        {data.map((item, index) => {
          return (
            <View
              style={{
                marginBottom: 15,
              }}>
              <Collapsible
                title={item.title}
                content={item.content}
                color={colorList[index % 3]}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaler(20),
  },
});
