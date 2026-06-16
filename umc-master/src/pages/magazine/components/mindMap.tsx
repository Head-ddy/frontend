import styled from 'styled-components';
import { motion } from 'framer-motion';
import Img from '@assets/character/magazine.png';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import { usePopularHashtags } from '@apis/queries/usePolicyQueries';

const nodes = [
  { label: '#재활용1', x: '70%', y: '15%', color: theme.colors.primary[400] },
  { label: '#재활용2', x: '80%', y: '50%', color: theme.colors.primary[500] },
  { label: '#재활용3', x: '65%', y: '80%', color: theme.colors.primary[600] },
  { label: '#재활용4', x: '30%', y: '90%', color: theme.colors.primary[700] },
  { label: '#재활용5', x: '5%', y: '60%', color: theme.colors.primary[800] },
  { label: '#재활용6', x: '10%', y: '20%', color: theme.colors.primary[900] },
];

const MindMap = () => {
  const { data } = usePopularHashtags({ limit: 6 });
  console.log('인기 관심사 로그', data);
  return (
    <MapContainer>
      <LineContainer xmlns="http://www.w3.org/2000/svg">
        {nodes.map((node, index) => (
          <line
            key={index}
            x1="50%"
            y1="50%"
            x2={node.x}
            y2={node.y}
            stroke={theme.colors.text.lightGray}
            strokeWidth="1"
          />
        ))}
      </LineContainer>
      <CenterNode>
        <motion.img
          src={Img}
          alt="Center"
          style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </CenterNode>
      {data?.slice(0, nodes.length).map((hashtag, index) => (
        <Node
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2, x: 5, y: 5 }}
          transition={{ duration: 0.8, delay: index * 0.2, type: 'spring', stiffness: 200, damping: 10 }}
          style={{ left: nodes[index].x, top: nodes[index].y }}
          $color={nodes[index].color}
        >
          <Typography variant="bodyLarge">#{hashtag.name}</Typography>
        </Node>
      ))}
    </MapContainer>
  );
};

export default MindMap;

const MapContainer = styled.div`
  position: relative;
  width: 90%;
  margin-top: -60px;
  aspect-ratio: 2; /* 가로:세로 비율 2:1 */
`;

const CenterNode = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Node = styled(motion.div)<{ $color: string }>`
  position: absolute;
  background: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.text.white};
  padding: 16px 42px;
  border-radius: 20px;
  white-space: nowrap;
  z-index: 5;
`;

const LineContainer = styled(motion.svg)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;
