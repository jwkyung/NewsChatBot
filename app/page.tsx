'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const searchNews = async () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setNews([]);
    setSummary('');
    setMessages([]);

    try {
      const response = await fetch(`/api/news?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '뉴스 검색에 실패했습니다.');
      }

      setNews(data.news || []);
      
      // 뉴스를 가져온 후 자동으로 요약 생성
      if (data.news && data.news.length > 0) {
        generateSummary(data.news);
      }
    } catch (error: any) {
      alert(error.message || '뉴스 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (newsData: NewsItem[]) => {
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news: newsData }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || data.details || '요약 생성에 실패했습니다.';
        throw new Error(errorMsg);
      }

      setSummary(data.summary);
    } catch (error: any) {
      const errorMsg = error.message || '요약 생성 중 오류가 발생했습니다.';
      alert(`오류: ${errorMsg}`);
    }
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) {
      return;
    }

    if (news.length === 0) {
      alert('먼저 뉴스를 검색해주세요.');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: chatMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatMessage('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          news: news,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || data.details || '응답 생성에 실패했습니다.';
        throw new Error(errorMsg);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMsg = error.message || '응답 생성 중 오류가 발생했습니다.';
      alert(`오류: ${errorMsg}`);
      setMessages((prev) => prev.slice(0, -1)); // 사용자 메시지 제거
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>뉴스 챗봇</h1>
        <p className={styles.subtitle}>키워드를 입력하고 뉴스를 검색한 후 AI와 대화하세요</p>

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchNews();
                }
              }}
              placeholder="검색할 키워드를 입력하세요..."
              className={styles.searchInput}
            />
            <button
              onClick={searchNews}
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? '검색 중...' : '검색'}
            </button>
          </div>
        </div>

        {news.length > 0 && (
          <div className={styles.contentGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.newsSection}>
                <h2 className={styles.sectionTitle}>검색된 뉴스 ({news.length})</h2>
                <div className={styles.newsList}>
                  {news.map((item, index) => (
                    <div key={index} className={styles.newsItem}>
                      <h3 className={styles.newsTitle}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.newsLink}
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className={styles.newsSnippet}>{item.snippet}</p>
                      <div className={styles.newsMeta}>
                        <span className={styles.newsSource}>{item.source}</span>
                        {item.date && (
                          <span className={styles.newsDate}>
                            {new Date(item.date).toLocaleDateString('ko-KR')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              {summary && (
                <div className={styles.summarySection}>
                  <h2 className={styles.sectionTitle}>뉴스 요약</h2>
                  <div className={styles.summaryContent}>
                    <p>{summary}</p>
                  </div>
                </div>
              )}

              <div className={styles.chatSection}>
                <h2 className={styles.sectionTitle}>뉴스 기반 챗봇</h2>
                <div className={styles.chatMessages}>
                  {messages.length === 0 && (
                    <div className={styles.emptyChat}>
                      <p>검색된 뉴스에 대해 질문해보세요!</p>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${styles.message} ${
                        msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                      }`}
                    >
                      <div className={styles.messageContent}>{msg.content}</div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className={`${styles.message} ${styles.assistantMessage}`}>
                      <div className={styles.messageContent}>답변을 생성하는 중...</div>
                    </div>
                  )}
                </div>
                <div className={styles.chatInput}>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="뉴스에 대해 질문해보세요..."
                    className={styles.chatTextarea}
                    rows={3}
                  />
                  <button
                    onClick={sendChatMessage}
                    disabled={chatLoading || !chatMessage.trim()}
                    className={styles.chatButton}
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
