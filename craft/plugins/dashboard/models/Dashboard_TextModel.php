<?php
/**
 * Dashboard plugin for Craft CMS
 *
 * Dashboard_Text Model
 *
 * --snip--
 * Models are containers for data. Just about every time information is passed between services, controllers, and
 * templates in Craft, it’s passed via a model.
 *
 * https://craftcms.com/docs/plugins/models
 * --snip--
 *
 * @author    Designosource
 * @copyright Copyright (c) 2018 Designosource
 * @link      http://www.designosource.be
 * @package   Dashboard
 * @since     1.0.0
 */

namespace Craft;

class Dashboard_TextModel extends BaseModel
{
    /**
     * Defines this model's attributes.
     *
     * @return array
     */
    protected function defineAttributes()
    {
        return array_merge(parent::defineAttributes(), array(
            'someField'     => array(AttributeType::String, 'default' => 'some value'),
        ));
    }

}