import React, { useState, useRef, useEffect } from 'react';
import Sentiment from 'sentiment';
import {
  Box, Paper, Typography, TextField, IconButton, Fab, Avatar, Fade, Tooltip,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import './Chatbot.css'; // optional styling

const SentimentIcon = ({ sentiment }) => {
  if (sentiment === 'Positive') return <Tooltip title="Positive"><SentimentSatisfiedAltIcon sx={{ fontSize: 16, color: 'success.main' }} /></Tooltip>;
  if (sentiment === 'Negative') return <Tooltip title="Negative"><SentimentVeryDissatisfiedIcon sx={{ fontSize: 16, color: 'error.main' }} /></Tooltip>;
  if (sentiment === 'Neutral') return <Tooltip title="Neutral"><SentimentNeutralIcon sx={{ fontSize: 16, color: 'text.secondary' }} /></Tooltip>;
  return null;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you with BloodLinkAI today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  const sentiment = new Sentiment();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Function for bot replies based on user message text
  const getBotReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hello! How can I assist you today?';
    }
    if (lower.includes('thank')) {
      return 'You\'re welcome! Glad I could help.';
    }
    if (lower.includes('blood')) {
      return 'Blood donation is a lifesaver! How can I assist you regarding donations?';
    }
    if (lower.includes('help')) {
      return 'Sure, I\'m here to help! Please tell me what you need.';
    }
    if (lower.includes('bye') || lower.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    }
    // Default fallback response
    return 'Thanks for your message! This is a demo response.';
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    let sentimentLabel = 'Neutral';
    try {
      const result = sentiment.analyze(inputText);
      if (result.score > 0) sentimentLabel = 'Positive';
      else if (result.score < 0) sentimentLabel = 'Negative';
    } catch (error) {
      console.error('Sentiment analysis error:', error);
    }

    const userMessage = { from: 'user', text: inputText, sentiment: sentimentLabel };
    setMessages(prev => [...prev, userMessage]);
    
    const botReply = getBotReply(inputText);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    }, 1000);
  };

  return (
    <>
      <Fab color="primary" onClick={toggleChat} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      <Fade in={isOpen}>
        <Paper elevation={8} sx={{ position: 'fixed', bottom: 96, right: 24, width: 350, height: 500, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6">Conversation with Bot</Typography>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
                {msg.from === 'bot' && <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>B</Avatar>}
                <Paper elevation={1} sx={{ p: 1, borderRadius: 2, maxWidth: '70%', backgroundColor: msg.from === 'user' ? '#e3f2fd' : '#fff' }}>
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
                {msg.from === 'user' && msg.sentiment && (
                  <Box sx={{ alignSelf: 'flex-end', ml: 1 }}>
                    <SentimentIcon sentiment={msg.sentiment} />
                  </Box>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box component="form" sx={{ p: 1, borderTop: '1px solid #ccc', display: 'flex' }}
               onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write your message here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              size="small"
            />
            <IconButton color="primary" type="submit">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default Chatbot;
