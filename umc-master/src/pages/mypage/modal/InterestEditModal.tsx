/* eslint-disable react/prop-types */
import styled, { useTheme } from 'styled-components';
import Typography from '@components/common/typography';
import Button from '@components/Button/Button';
import CategoryInputSection from '@pages/main/components/CategoriesInputSection';
import { useEffect, useState } from 'react';
import ImgClose from '@assets/close.svg';

interface InterestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hashtags: string[]) => void | Promise<void>;
  categories: { section: string; tags: string[] }[];
  initialTags: string[];
}

const InterestEditModal: React.FC<InterestEditModalProps> = ({ isOpen, onClose, onSave, categories, initialTags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const theme = useTheme();

  useEffect(() => {
    if (isOpen) setSelectedTags(initialTags);
  }, [initialTags, isOpen]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag);
      if (prev.length >= 10) {
        alert('관심사는 최대 10개까지 선택할 수 있습니다.');
        return prev;
      }
      return [...prev, tag];
    });
  };

  const handleEdit = async () => {
    await onSave(selectedTags);
    alert('관심사가 로컬 프로토타입에 저장되었습니다.');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <InterestEditForm>
          <Close onClick={onClose}>
            <img src={ImgClose} alt="close" />
          </Close>
          <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
            나의 관심사 변경
          </Typography>
          <HelperText>
            <Typography variant="bodySmall">선택한 태그는 메인 맞춤 꿀팁과 마이페이지에 바로 반영돼요.</Typography>
            <Typography variant="bodyXSmall">현재 {selectedTags.length}/10개 선택</Typography>
          </HelperText>
          <ScrollableContent>
            <CategoryInputSection
              categories={categories}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
              isComplete={false}
              isHasTitle={false}
              tagAndTitleGap={10}
            />
          </ScrollableContent>
          <Button variant="interestEdit" onClick={handleEdit}>
            나의 관심사 변경 완료
          </Button>
        </InterestEditForm>
      </Container>
    </ModalOverlay>
  );
};

export default InterestEditModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 68px 60px 68px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  display: inline-flex;
  padding: 100px 66px 63px 54px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[800]};
  background: #fff;
`;

const Close = styled.button`
  position: absolute;
  top: -60px;
  right: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const InterestEditForm = styled.div`
  position: relative;
  display: flex;
  width: 720px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const HelperText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.gray};
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
`;
