import React from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import '../../utils/editorStyles.css';
import ComponentIcon from './ComponentIcon';

interface LinkSelectorProps {
  linkType: string;
  setLinkType: Function;
  url: string;
  setUrl: Function;
}

const LinkSelector: React.FC<LinkSelectorProps> = ({
  linkType,
  setLinkType,
  url,
  setUrl,
}) => {
  return (
    <div className="editor-component">
      <ComponentIcon icon={BiLinkAlt} size={30} />

      <div className="mt-1 w-full">
        <div className="flex items-center gap-5 mb-1 text-[12px]">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="linkType"
              value="URL"
              checked={linkType === 'URL'}
              onChange={(e) => setLinkType(e.target.value)}
            />
            <span>URL</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="linkType"
              value="Subpage"
              checked={linkType === 'Subpage'}
              onChange={(e) => setLinkType(e.target.value)}
            />
            <span>Subpage</span>
          </label>
        </div>

        <input
          type="text"
          placeholder="Enter a URL or @ to link to a Subpage"
          className="editor-input mb-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LinkSelector;
