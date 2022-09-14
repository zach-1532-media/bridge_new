import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

const photos = [
  {
    src: 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1663181480/blog/Change_5_iq7vkq.jpg',
    rows: 1,
    cols: 2,
  },
  {
    src: 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1663181490/blog/Change_4_pm2ygq.jpg',
    rows: 1,
    cols: 1,
  },
  {
    src: 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1663181498/blog/Change_3_eshmym.jpg',
    rows: 1,
    cols: 1,
  },
  {
    src: 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1663181504/blog/Change_6_cwou7o.jpg',
    rows: 1,
    cols: 2,
  },
];

const socials = [
  {
    ariaLabel: 'Facebook',
    icon: <FacebookIcon />,
  },
  {
    ariaLabel: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    ariaLabel: 'Twitter',
    icon: <TwitterIcon />,
  },
];

const Content = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box sx={{ px: { xs: 0, sm: 4, md: 6 } }}>
        <Typography
          align="center"
          sx={{
            fontWeight: 400,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
            color: theme.palette.tertiary.light,
          }}
        >
          “Whether you are looking to change companies or change career paths
          altogether, it is important that you do your research and put yourself
          in the best position to land your next opportunity. ”
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" sx={{ mb: '1em' }}>
            Where you work and what you do for a living is one of the most
            important decisions you will make in your life. Given the amount of
            time the average person spends at work throughout the year, it is
            very important that you find something that you enjoy.
            <br />
            <br />
            Whether you are looking to change companies or change career paths
            altogether, it is important that you do your research and put
            yourself in the best position to land your next opportunity.
            <br />
            <br />
            This resource guide breaks down the hiring process into 3 simple
            steps that will help you on your journey.
          </Typography>
          <List sx={{ mb: '1em' }}>
            <ListItem>
              <Typography>
                <b>Part 1: </b>Asking yourself the right questions{' '}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>Part 2: </b>It's time to show off{' '}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>Part 3: </b>New me, now what?{' '}
              </Typography>
            </ListItem>
          </List>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              mb: '1em',
              fontWeight: 400,
              fontSize: '2.125rem',
              lineHeight: 1.235,
              letterSpacing: '0.00735em',
            }}
          >
            Part 1: Asking yourself the right questions
          </Typography>
          <Typography>
            So, you have made the decision that it is time for a change at work.
            Perhaps your current role feels stale or perhaps you see other
            people moving up and making more money and you want that for
            yourself. Maybe it is time to tackle something brand new. Therefore
            the first and most important question you need to ask is:
            <List>
              <ListItem>
                <Typography>
                  A. Do I want to stay on my current career path?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  B. Do I want to change what I do for a living?
                </Typography>
              </ListItem>
            </List>
            This is a big question to ask yourself. People have been successful
            and found happiness in doing one thing very well their whole life.
            Other people need to switch it up and constantly learn new roles and
            take on new challenges. Are you in a position to take more risks and
            responsibilities in your life? Do you have the extra time that you
            will need to put in to be good at something new? Are you at the
            point where you absolutely need to make a change?
            <br />
            <br />
            Whatever the reason may be for you to want to make a change, there
            are only 4 possible outcomes on where you will land.
            <List>
              <ListItem>
                <Typography>1. Same Career Path - Same Company</Typography>
              </ListItem>
              <ListItem>
                <Typography>2. Same Career Path - New Company</Typography>
              </ListItem>
              <ListItem>
                <Typography>3. New Career Path - Same Company</Typography>
              </ListItem>
              <ListItem>
                <Typography>4. New Career Path - New Company </Typography>
              </ListItem>
            </List>
            Outcomes 1 and 2 assume you enjoy what you do
            <br />
            <br />
            Outcomes 3 and 4 assume you are ready for a new challenge
            <br />
            <br />
            Let's take a look at each outcome below with a list of things you
            should consider when breaking down your next career move.
          </Typography>
        </Box>
        <Box
          sx={{
            width: 1,
            height: 1,
            my: 4,
          }}
        >
          <LazyLoadImage
            height="100%"
            width="100%"
            src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1663179838/blog/Simple_Flowchart_Infographic_Graph_1_gkmo67.png"
            alt="Remote working"
            effect="blur"
            style={{
              objectFit: 'cover',
              borderRadius: 8,
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ px: { xs: 0, sm: 4, md: 6 } }}>
        <Box>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '1em',
            }}
          >
            Now - let's break down each path:
          </Typography>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '.2em',
            }}
          >
            Same Career Path - Same Company
          </Typography>
          <Typography>
            Let's assume you enjoy what you do for a living. There are a lot of
            reasons for you to stay at the same company. If you enjoy what you
            do, get along with the people you work with, and feel you are
            adequately paid, there may be no reason to leave.
            <br />
            <br />
            The change you want to make is to further your career by “doing
            more” and taking on my responsibility. Perhaps the next step is to
            become a manager, or perhaps more from service to sales. Whatever
            the reason is, you are hungry for the next step.
            <br />
            <br />
            Questions to consider:
            <List>
              <ListItem>
                <Typography>
                  1. Does your company have current openings that are in line
                  with your next role?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  2. Will it change who you report to? If so, what do you know
                  about them?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  3. Have you had conversations with your current manager?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  4. How well is the company doing? Will they be around in 5-10
                  years?
                </Typography>
              </ListItem>
            </List>
          </Typography>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '.2em',
              mt: '1em',
            }}
          >
            Same Career Path - New Company
          </Typography>
          <Typography>
            On the other hand, job switchers have had higher wage growth over
            the past few years when compared to job stayers. Perhaps you need a
            change of scenery and a fresh start. Then again, you run the risk of
            not liking it as much as the current company. Changing the company
            you work for can be a big risk.
            <br />
            <br />
            Questions to consider:
            <List>
              <ListItem>
                <Typography>
                  1. Is the new company more aligned with my long-term career
                  goals?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  2. Will the new company offer me higher pay and better
                  benefits?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  3. Am I ready to learn all new systems, people, and work
                  environments?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  4. What happens if I don't land a new job and my current boss
                  finds out I have been interviewing?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>5. Am I switching companies too much?</Typography>
              </ListItem>
            </List>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <ImageList
          variant="quilted"
          cols={3}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photos.map((photo) => (
            <ImageListItem
              key={photo.src}
              cols={photo.cols || 2}
              rows={photo.rows || 1}
            >
              <LazyLoadImage
                height="100%"
                width="100%"
                src={photo.src}
                alt="..."
                effect="blur"
                style={{
                  objectFit: 'cover',
                  cursor: 'poiner',
                  borderRadius: 8,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Box sx={{ px: { xs: 0, sm: 4, md: 6 } }}>
        <Box>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '.2em',
            }}
          >
            New Career Path - Same Company
          </Typography>
          <Typography>
            Chances are if this is you, you enjoy the people and company you
            work for, but you need a new challenge. People can change what they
            enjoy over time. A job you loved at 22 you may not enjoy nearly as
            much at 30. If you want to change what you do for a living, have you
            landed on what it is you want to do? It would be beneficial to job
            shadow and talk to people in other departments or areas and see what
            their day-to-day is like.
            <br />
            <br />
            The good news is that the company you currently work for is far more
            likely to take a chance on you moving to a new role with little to
            no experience. They know what kind of work you do, and the value you
            bring. They may also help you make that change by offering to pay
            for school or online courses.
            <br />
            <br />
            Oftentimes, the most valuable employees, in the long run, are those
            who have worked in multiple roles because they understand how things
            connect within the company.
            <br />
            <br />
            Questions to consider:
            <List>
              <ListItem>
                <Typography>
                  1. Does the company I work for have a good career path for my
                  new line of work?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  2. Will they help pay for schooling or courses for you to
                  learn?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  3. Are you okay with knowing that your pay and title might not
                  increase for a while?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  4. Are you ready to put in extra time and effort to be good at
                  something new?
                </Typography>
              </ListItem>
            </List>
          </Typography>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '.2em',
              mt: '1em',
            }}
          >
            New Career Path - New Company
          </Typography>
          <Typography>
            If you are looking to work for a new company doing something that
            you have little to no experience at, it will be tough to find a
            company to take a risk on you unless you are willing to take on an
            entry role or similar. Your expectations should reflect this. There
            will be stressful days and you will have to put in more hours and
            more effort to become good at it, but this path may end up being the
            most rewarding.
            <br />
            <br />
            Questions to consider:
            <List>
              <ListItem>
                <Typography>
                  1. Am I ready to handle the added stress and anxiety that is
                  likely to come with a big change?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  2. What are the top companies in my area that do what I want
                  to do?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  3. Have I looked into them and know their reputation?
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>4. Financially, can I afford it?</Typography>
              </ListItem>
              <ListItem>
                <Typography>5. Am I ready to put in more work?</Typography>
              </ListItem>
            </List>
          </Typography>
          <Typography
            align={isMd ? 'left' : 'center'}
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
              mb: '.2em',
              mt: '1em',
            }}
          >
            What did you learn?
          </Typography>
          <Typography>
            If you had trouble answering some of these questions, you either are
            not ready for a change or are not prepared as much as you should be.
            <br />
            <br />
            If you had no problems with answering these questions and they
            provided you clarity or validation, it is time to move to{' '}
            <b>Part 2</b>: “It's time to show off”
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: '2em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'cetner',
          width: '100%',
        }}
      >
        <Link href="/signUp" passHref>
          <Button fullWidth={!isMd} variant="contained" size="large">
            Sign Up Today!
          </Button>
        </Link>
      </Box>

      <Box paddingY={4}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ width: 50, height: 50, mr: 2 }}
            src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1661163822/avatars/6303568b0053bc70f67d04c2.jpg"
          />
          <Box>
            <Typography fontWeight={600}>Nolan Vannucci</Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              Sep 14, 2022
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Share:
          </Typography>
          <Box sx={{ ml: 0.5 }}>
            {socials.map((social) => (
              <IconButton
                key={social.ariaLabel}
                disableRipple
                aria-label={social.ariaLabel}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
