import PageShell from "../components/layout/PageShell";
import { QuickActions, SectionNav, SocialIcons } from "../components/layout/SidebarCards";
import AboutSection from "../components/profile/AboutSection";
import InterestsSection from "../components/profile/InterestsSection";
import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  VolunteeringSection,
} from "../components/profile/ListSections";
import ProfileHeader from "../components/profile/ProfileHeader";
import SkillsSection from "../components/profile/SkillsSection";

const ProfilePage = () => (
  <PageShell
    aside={
      <>
        <SectionNav />
        <QuickActions className="max-md:border-t-0" />
        <SocialIcons />
      </>
    }
  >
    <ProfileHeader />
    <AboutSection />
    <EducationSection />
    <ProjectsSection />
    <CertificationsSection />
    <SkillsSection />
    <ExperienceSection />
    <VolunteeringSection />
    <InterestsSection />
  </PageShell>
);

export default ProfilePage;
