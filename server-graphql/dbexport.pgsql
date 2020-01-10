--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: windiana
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    video_id integer,
    text text
);


ALTER TABLE public.comments OWNER TO windiana;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: windiana
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO windiana;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: windiana
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: windiana
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title text,
    duration integer,
    watched boolean
);


ALTER TABLE public.videos OWNER TO windiana;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: windiana
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.videos_id_seq OWNER TO windiana;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: windiana
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: windiana
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: windiana
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: windiana
--

COPY public.comments (id, video_id, text) FROM stdin;
1	1	Bagus banget sih video tutorialnya
2	1	Aku suka banget sama tutorial ini!!!
5	3	Cara menghapus commentnya giman ya kakak?
7	2	Nagaca dong woy
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: windiana
--

COPY public.videos (id, title, duration, watched) FROM stdin;
1	Eh nambah lagi jadi 5	30	f
2	I know you are perfect, but i am flawless	180	f
3	Why you gonna be a king when you could be a god?	90	f
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: windiana
--

SELECT pg_catalog.setval('public.comments_id_seq', 7, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: windiana
--

SELECT pg_catalog.setval('public.videos_id_seq', 3, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: windiana
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: windiana
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: comments comments_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: windiana
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id);


--
-- PostgreSQL database dump complete
--

